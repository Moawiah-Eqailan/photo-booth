let selectedFrame = null;

function selectFrame(frameId) {
    console.log("Frame selected:", frameId);
    selectedFrame = `/assets/images/frames/frame${frameId}.png`;

    const framePage = document.getElementById("frame-selection-page");
    const cameraPage = document.getElementById("camera-page");

    if (!document.querySelector(`.frame[src="${selectedFrame}"]`)) {
        alert("الإطار المحدد غير موجود.");
        return;
    }

    framePage.classList.add("hidden");
    cameraPage.classList.remove("hidden");

    const camera = document.querySelector("#camera");
    if (!camera) {
        console.error("Camera element not found.");
        return;
    }

    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            camera.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error accessing camera:", err);
            alert("حدث خطأ أثناء الوصول إلى الكاميرا. تأكد من أن الكاميرا متصلة ومسموح بها.");
        });
}

function startCamera() {
    const welcomePage = document.getElementById("welcome-page");
    const frameSelectionPage = document.getElementById("frame-selection-page");

    if (!welcomePage || !frameSelectionPage) {
        console.error("HTML structure is missing necessary elements.");
        return;
    }

    welcomePage.classList.add("hidden");
    frameSelectionPage.classList.remove("hidden");
}

function capturePhoto() {
    const video = document.querySelector("#camera");
    if (!video) {
        alert("الكاميرا غير متوفرة.");
        return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (video.videoWidth === 0 || video.videoHeight === 0) {
        alert("الكاميرا لم تكن قادرة على التقاط الصورة. حاول مرة أخرى.");
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    saveImage(imageData);
}

function saveImage(imageData) {
    fetch("/save_image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Image saved:", data);
            window.location.href = `/qrcode/${data.filePath}`;
        })
        .catch((error) => {
            console.error("Error saving image:", error);
            alert("حدث خطأ أثناء حفظ الصورة. حاول مرة أخرى.");
        });
}
