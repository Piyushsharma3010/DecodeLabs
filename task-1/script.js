  document.getElementById('year').textContent = new Date().getFullYear();

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('navLinks');
  var scrim = document.getElementById('navScrim');

  function closeMenu(){
    nav.classList.remove('open');
    scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu(){
    nav.classList.add('open');
    scrim.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  toggle.addEventListener('click', function(){
    if (nav.classList.contains('open')) { closeMenu(); } else { openMenu(); }
  });
  scrim.addEventListener('click', closeMenu);
  var navAnchorList = document.querySelectorAll('#navLinks a');
  for (var i = 0; i < navAnchorList.length; i++) {
    navAnchorList[i].addEventListener('click', closeMenu);
  }

  var eventDate = new Date('2026-10-18T09:00:00').getTime();

  function updateCountdown(){
    var now = new Date().getTime();
    var diff = eventDate - now;

    if (diff < 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  var selectedType = 'General';
  var selectedPrice = 1499;
  var quantity = 1;

  var ticketCards = document.querySelectorAll('.ticket-card');

  function selectTicket(card){
    for (var i = 0; i < ticketCards.length; i++) {
      ticketCards[i].classList.remove('selected');
    }
    card.classList.add('selected');
    selectedType = card.getAttribute('data-type');
    selectedPrice = parseInt(card.getAttribute('data-price'), 10);
    updateSummary();
  }

  for (var t = 0; t < ticketCards.length; t++) {
    ticketCards[t].addEventListener('click', function(){ selectTicket(this); });
  }
  selectTicket(ticketCards[0]);

  document.getElementById('qtyMinus').addEventListener('click', function(){
    if (quantity > 1) { quantity--; updateSummary(); }
  });
  document.getElementById('qtyPlus').addEventListener('click', function(){
    if (quantity < 10) { quantity++; updateSummary(); }
  });

  function updateSummary(){
    document.getElementById('summaryType').textContent = selectedType + ' ticket';
    document.getElementById('qtyValue').textContent = quantity;
    document.getElementById('summaryPrice').textContent = '₹' + selectedPrice.toLocaleString('en-IN');
    document.getElementById('summaryQty').textContent = quantity;
    document.getElementById('summaryTotal').textContent = '₹' + (selectedPrice * quantity).toLocaleString('en-IN');
  }

  var form = document.getElementById('bookingForm');
  var status = document.getElementById('formStatus');

  function validateField(fieldEl, inputEl, testFn){
    var ok = testFn(inputEl.value.trim());
    if (ok) {
      fieldEl.classList.remove('invalid');
    } else {
      fieldEl.classList.add('invalid');
    }
    return ok;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    var nameOk = validateField(
      document.getElementById('nameField'),
      document.getElementById('name'),
      function(v){ return v.length > 1; }
    );
    var emailOk = validateField(
      document.getElementById('emailField'),
      document.getElementById('email'),
      function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    );
    var phoneOk = validateField(
      document.getElementById('phoneField'),
      document.getElementById('phone'),
      function(v){ return /^[0-9+\-\s]{7,15}$/.test(v); }
    );

    if (nameOk && emailOk && phoneOk) {
      status.textContent = 'Booked! ' + quantity + ' \u00d7 ' + selectedType + ' ticket(s) \u2014 total \u20b9' +
        (selectedPrice * quantity).toLocaleString('en-IN') + '. (Demo form \u2014 nothing is actually charged.)';
      status.classList.add('show');
      form.reset();
    } else {
      status.textContent = 'Please fix the highlighted fields before confirming.';
      status.classList.add('show');
    }
  });

  var faqButtons = document.querySelectorAll('.faq-q');
  for (var f = 0; f < faqButtons.length; f++) {
    faqButtons[f].addEventListener('click', function(){
      var item = this.parentElement;
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        this.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        this.setAttribute('aria-expanded', 'true');
      }
    });
  }
