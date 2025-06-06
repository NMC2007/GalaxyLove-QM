window.onload = function () {
    const container = document.getElementById('container');
    const audio = document.querySelector('.myAudio');
    let isAudioStarted = false;

    const texts = [
        'Ngth_iu',
        'Thuý Hường ♥ Đình Quang',
        'Vợ anh ♥',
        'Yêu em nhiều lắm ♥',
        'Luôn bên cạnh nhau nhaa ♥',
        'Yêu nhau nhiều hơn ♥',
        'cảm ơn ebe đã đến bên anh ♥',
        'yêu Thuý Hường của anh lắmmm ♥',
        'Love u so much ♥',
        'Dreaming of us ♥',
        'Immersed in your love ♥',
        'i treat myself with kindness ♥',
        '♥',
        '❤️',
        '💗',
        '💓',
        '💘',
        '🧸',
        '🍓',
        '🫧',
        '🎀',
        '💋',
    ];

    const textsColor = [
        'rgb(255, 169, 185)',
        'rgb(255, 98, 216)',
        'rgb(255, 119, 191)',
        'rgb(255, 240, 251)'
    ];

    const boxImage = [
        'img/QM1.jpg',
        'img/QM2.jpg',
        'img/QM3.jpg',
        'img/QM4.jpg',
        'img/QM5.jpg',
        'img/QM6.jpg',
    ];



    // chống cuộn
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('wheel', function (e) {
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('gesturechange', function (e) {
        e.preventDefault();
    });

    document.addEventListener('gestureend', function (e) {
        e.preventDefault();
    });


    // chữ rơi
    function CreateFallingElement() {
        const el = document.createElement('div');
        el.className = 'falling';

        el.textContent = texts[Math.floor(Math.random() * texts.length)];
        el.style.color = textsColor[Math.floor(Math.random() * textsColor.length)];

        const z = Math.floor(Math.random() * 500 - 250);
        el.style.setProperty('--z-depth', `${z}px`);

        const absZ = Math.abs(z);

        let fontSize, duration, opacity;

        if (absZ > 180) {
            fontSize = Math.random() * (18 - 12) + 12;
            duration = Math.random() * 3 + 9;
            opacity = 0.5;
        } else if (absZ > 80) {
            fontSize = Math.random() * (27 - 16) + 16;
            duration = Math.random() * 3 + 7;
            opacity = 0.7;
        } else {
            fontSize = Math.random() * (35 - 20) + 20;
            duration = Math.random() * 2 + 5;
            opacity = 0.9;
        }

        const containerWidth = container.offsetWidth;
        el.style.left = Math.random() * (containerWidth - 200) + 'px';
        el.style.top = '0px';   // Bắt đầu từ trên cùng container
        el.style.fontSize = `${fontSize}px`;
        el.style.animationDuration = `${duration}s`;
        el.style.opacity = opacity;

        el.style.transform = `translateZ(${z}px)`; // hiệu ứng chiều sâu

        container.appendChild(el);

        setTimeout(() => el.remove(), duration * 1000 + 1000);
    }



    // Ảnh rơi
    function CreateFallingImage() {
        const im = document.createElement('img');
        im.className = 'image';

        im.src = boxImage[Math.floor(Math.random() * boxImage.length)];


        const z = Math.floor(Math.random() * 500 - 250);
        im.style.setProperty('--z-depth', `${z}px`);

        const absZ = Math.abs(z);

        let duration, opacity;

        if (absZ > 180) {
            duration = Math.random() * 3 + 9;
            opacity = 0.7;
        } else if (absZ > 80) {
            duration = Math.random() * 3 + 7;
            opacity = 0.8;
        } else {
            duration = Math.random() * 2 + 5;
            opacity = 0.9;
        }

        const containerWidth = container.offsetWidth;
        im.style.left = Math.random() * (containerWidth - 200) + 'px';
        im.style.top = '0px';
        im.style.animationDuration = `${duration}s`;
        im.style.opacity = opacity;

        im.style.transform = `translateZ(${z}px)`;

        container.appendChild(im);

        setTimeout(() => im.remove(), duration * 1000 + 1000);
    }



    // mật độ chữ và ảnh
    setInterval(CreateFallingElement, 220); // chữ
    setInterval(CreateFallingImage, 1500); // ảnh
    
    // phát nhạc
    function tryPlayAudio() {
        if (!isAudioStarted) {
            audio.currentTime = 17;
            audio.play().then(() => {
                isAudioStarted = true;
                console.log('Audio started automatically');
            }).catch(err => {
                console.log('Play prevented by browser:', err);
            });
        }
    }

    ['click', 'touchstart', 'touchmove', 'mousemove'].forEach(event => {
        document.addEventListener(event, tryPlayAudio, { once: true });
    });


    // di chuột
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        rotateContainer(y, -x);
    });

    // vuốt chạm
    let lastTouch = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
        }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();

            const dx = e.touches[0].clientX - lastTouch.x;
            const dy = e.touches[0].clientY - lastTouch.y;

            // độ nhạy
            currentRotation.x += dy * 0.15;
            currentRotation.y += -dx * 0.15;

            // giới hạn góc xoay
            currentRotation.x = Math.max(-50, Math.min(50, currentRotation.x));
            currentRotation.y = Math.max(-50, Math.min(50, currentRotation.y));

            rotateContainer(currentRotation.x, currentRotation.y);

            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
        }
    }, { passive: false });

    function rotateContainer(rx, ry) {
        container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }


    function rotateContainer(rx, ry) {
        container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
};
// đã cập nhật trên github