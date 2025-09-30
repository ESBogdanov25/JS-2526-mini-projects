function displayHome() 
{

    let home = document.getElementById("home");
    let homeBtn = document.querySelector('[data-tab="home"]');

    document.querySelectorAll(".tab-content").forEach(content => content.style.display = "none");
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));

    home.style.display = "block";
    homeBtn.classList.add("active");
}

function displayAbout() 
{
    let about = document.getElementById("about");
    let aboutBtn = document.querySelector('[data-tab="about"]');

    document.querySelectorAll(".tab-content").forEach(content => content.style.display = "none");
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));

    about.style.display = "block";
    aboutBtn.classList.add("active");
}

function displayContact() 
{
    let contact = document.getElementById("contact");
    let contactBtn = document.querySelector('[data-tab="contact"]');

    document.querySelectorAll(".tab-content").forEach(content => content.style.display = "none");
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    
    contact.style.display = "block";
    contactBtn.classList.add("active");
}

window.onload = function() 
{
    displayHome();
}