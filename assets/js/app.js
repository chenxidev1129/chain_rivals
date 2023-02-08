
// 3D Button Effect
let calculateAngle = function(e, item, parent) {
    let dropShadowColor = `rgba(0, 0, 0, 0.3)`
    if(parent.getAttribute('data-filter-color') !== null) {
        dropShadowColor = parent.getAttribute('data-filter-color');
    }

    // Get the x position of the users mouse, relative to the button itself
    let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
    // Get the y position relative to the button
    let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

    // Calculate half the width and height
    let halfWidth  = item.getBoundingClientRect().width / 2;
    let halfHeight = item.getBoundingClientRect().height / 2;

    // Use this to create an angle. I have divided by 6 and 4 respectively so the effect looks good.
    // Changing these numbers will change the depth of the effect.
    let calcAngleX = (x - halfWidth) / 40;
    let calcAngleY = (y - halfHeight) / 30;

    // Set the items transform CSS property
    item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.02)`;
    
    // And set its container's perspective.
    parent.style.perspective = `${halfWidth * 2}px`
    item.style.perspective = `${halfWidth * 3}px`

    if(parent.getAttribute('data-custom-perspective') !== null) {
        parent.style.perspective = `${parent.getAttribute('data-custom-perspective')}`
    }

    // Reapply this to the shadow, with different dividers
    let calcShadowX = (x - halfWidth) / 3;
    let calcShadowY = (y - halfHeight) / 3;
    
    // Add a filter shadow - this is more performant to animate than a regular box shadow.
    item.style.filter = `drop-shadow(${-calcShadowX}px ${calcShadowY}px 15px ${dropShadowColor})`;
}

document.querySelectorAll('.following-button').forEach(function(item) {
    item.addEventListener('mouseenter', function(e) {
        calculateAngle(e, this, this);
    });

    item.addEventListener('mousemove', function(e) {
        calculateAngle(e, this, this);
    });

    item.addEventListener('mouseleave', function(e) {
        let dropShadowColor = `rgba(0, 0, 0, 0.3)`
        if(item.getAttribute('data-filter-color') !== null) {
            dropShadowColor = item.getAttribute('data-filter-color')
        }
        item.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
        item.style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
    });
});

// Show Panel When Scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
    
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
  
window.addEventListener("scroll", reveal);
  