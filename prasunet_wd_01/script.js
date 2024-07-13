// when the window is scrolled down to the bottom of the page the color of the nav bar changes 
window.addEventListener('scroll', function() {
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#333';
        // included a shadow affect for telling the location of the user , as the position of the navbatr is fixed , when ever the user moves down , it shows shadow affect
        navbar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.7)';
    } else {
        navbar.style.backgroundColor = 'black';
        navbar.style.boxShadow = 'none';
    }
});


document.addEventListener('DOMContentLoaded' , function(){
    // Ensures that the JavaScript code runs only after the entire HTML document has been fully loaded and parsed.
    // ensures that all elements are available in the DOM before the script tries to interact with them.

    const contactitems = document.querySelector('.nav-item.dropdown');
    const dropdowncontent = document.querySelector('.dropdown-content');

    contactitems.addEventListener('mouseenter', function() {
        //Displays the dropdown content when the user hovers over the "Contact" menu item.
        
        dropdowncontent.style.display = 'block';
    });

    dropdowncontent.addEventListener('mouseleave', function(event) {
        //Hides the dropdown content when the user stops hovering over the "Contact" menu item, but only if the cursor is not moving into the dropdown content.

        if (!contactitems.contains(event.relatedTarget)){
            dropdowncontent.style.display = 'none';
        }
    });
// SMOOTH SCROLLING TO THE SECTION WHEN NAVBAR MENU CLICKED
    const smoothnav = document.querySelectorAll('.nav-item a[href^="#"]')
    // Selects all anchor links within navigation items that have an href attribute starting with # (indicates an internal link).
    //Adds a click event listener to each link to enable smooth scrolling to the corresponding section.
    smoothnav.forEach(link =>{
        link.addEventListener('click' , function(event){
            event.preventDefault(); //Prevents the default anchor link behavior (which jumps directly to the section without smooth scrolling)
            const idtargeted = this.getAttribute('href').substring(1);

            const sectiontargeted = document.getElementById(idtargeted)

            sectiontargeted.scrollIntoView({
                behavior : 'smooth' //Scrolls smoothly to the target section
            });
        });
    });
})