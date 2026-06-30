document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    const animateCounter = function (counter) {
      const target = Number(counter.getAttribute("data-counter")) || 0;
      const suffix = counter.getAttribute("data-suffix") || "";
      const duration = 1400;
      const startTime = performance.now();

      const update = function (currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased).toLocaleString("en-IN") + suffix;
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }
});

function showFormSuccess(formId, messageId) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);
  if (!form || !message) return false;
  message.style.display = "block";
  message.textContent = "Thank you. This static demo form has received your details.";
  form.reset();
  return false;
}

function verifyCertificateDemo() {
  const result = document.getElementById("verificationResult");
  const certificate = document.getElementById("certificateNumber");
  if (!result || !certificate) return false;

  const value = certificate.value.trim() || "CSC/2025/001";
  result.innerHTML = '<div class="verified-card"><h4><i class="fa-solid fa-circle-check"></i> Certificate Verified Successfully</h4><dl><dt>Student Name</dt><dd>Demo Student</dd><dt>Course</dt><dd>Goods Packaging Machine Operator</dd><dt>Certificate No.</dt><dd>' + value + '</dd><dt>Issue Date</dt><dd>Demo Date</dd><dt>Status</dt><dd>Verified</dd></dl><a class="btn-navy" href="#"><i class="fa-solid fa-download"></i> Download Certificate</a></div>';
  result.scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
}

function loginRedirectDemo(role) {
  const routes = {
    student: "student-dashboard.html",
    staff: "staff-dashboard.html",
    admin: "admin-dashboard.html"
  };
  window.location.href = routes[role] || "login.html";
  return false;
}

function showCustomSuccess(formId, messageId, text) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);
  if (!form || !message) return false;
  message.style.display = "block";
  message.textContent = text;
  form.reset();
  message.scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".gallery-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.getAttribute("data-filter");
      filterButtons.forEach(function (item) {
        item.classList.remove("btn-navy");
        item.classList.add("btn-soft");
      });
      button.classList.add("btn-navy");
      button.classList.remove("btn-soft");

      galleryItems.forEach(function (item) {
        const category = item.getAttribute("data-category");
        item.classList.toggle("is-hidden", filter !== "all" && category !== filter);
      });
    });
  });
});

function handleLoginDemo(event) {
  if (event) event.preventDefault();
  const role = document.getElementById("loginRole");
  const message = document.getElementById("loginMessage");
  if (!role || !role.value) {
    if (message) {
      message.style.display = "block";
      message.textContent = "Please select a login role to continue.";
    }
    return false;
  }
  loginRedirectDemo(role.value);
  return false;
}

function showAlertDemo(message) {
  alert(message);
  return false;
}