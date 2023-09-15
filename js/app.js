/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


// build the nav
const navList = document.getElementById('navbar__list');
for (let i = 1; i <= 4; i++) {
	const navItem = document.createElement('li');
	navItem.innerHTML = `<a" class="menu__link">Section ${i}</a>`;
	navList.appendChild(navItem);
}


// Add class 'active' to navList when near top of viewport according to distance from top
function activeClass() {
	const sections = document.querySelectorAll('section');
	for (let i = 0; i < sections.length; i++) {
		const section = sections[i];
		const sectionTop = section.getBoundingClientRect().top;
		const sectionBottom = section.getBoundingClientRect().bottom;
		const navItem = navList.children[i];
		if (sectionTop <= 10 && sectionBottom >= 0) {
			section.classList.add('your-active-class');
			navItem.classList.add('active');
		} else {
			section.classList.remove('your-active-class');
			navItem.classList.remove('active');
		}
	}
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
	event.preventDefault();
	let sectionId = `section${event.target.textContent.split(' ')[1]}`;
	const section = document.getElementById(sectionId);
	section.scrollIntoView({ behavior: 'smooth' });
}

// Scroll to section on link click
const navLinks = document.querySelectorAll('.menu__link');
for (let i = 0; i < navLinks.length; i++) {
	const navLink = navLinks[i];
	navLink.addEventListener('click', scrollToSection);
}
// add event listener to scroll
document.addEventListener('scroll', activeClass);