$(document).ready(function() {
  

  $(window).scroll(function() {
    if($(this).scrollTop() > 100) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
    

    if($(this).scrollTop() > 300) {
      $('.back-to-top').addClass('active');
    } else {
      $('.back-to-top').removeClass('active');
    }
  });
  

  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
      location.hostname == this.hostname
    ) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 1000);
        
 
        if ($('.navbar-collapse').hasClass('show')) {
          $('.navbar-toggler').click();
        }
      }
    }
  });
  

  $('.back-to-top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 800);
    return false;
  });
  

  $('.menu-categories button').click(function() {
    const category = $(this).data('category');
    
    $('.menu-categories button').removeClass('active');
    $(this).addClass('active');
    
    if(category === 'all') {
      $('.menu-item').fadeIn(300);
    } else {
      $('.menu-item').hide();
      $('.menu-item[data-category="' + category + '"]').fadeIn(300);
    }
  });
  

  const today = new Date().toISOString().split('T')[0];
  $('#date').attr('min', today);
  

  function fixFormStyles() {
 
    $('.date-dark').css({
      'background-color': 'rgba(28, 28, 28, 0.95)',
      'color': '#fff',
      'border': '1px solid rgba(255, 255, 255, 0.2)'
    });
    
  
    $('.dark-select').css({
      'background-color': 'rgba(28, 28, 28, 0.95)',
      'color': '#fff',
      'border': '1px solid rgba(255, 255, 255, 0.2)'
    });
    
   
    $('.dark-textarea').css({
      'background-color': 'rgba(28, 28, 28, 0.95)',
      'color': '#fff',
      'border': '1px solid rgba(255, 255, 255, 0.2)'
    });
    
    
    $('option').css({
      'background-color': '#1c1c1c',
      'color': '#fff'
    });
  }
  
  fixFormStyles();
  setTimeout(fixFormStyles, 100);
  

  $('.form-control, .form-select').on('focus click change', function() {
    fixFormStyles();
  });
  
  
  $('#bookingForm').submit(function(e) {
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const guests = $('#guests').val();
    const date = $('#date').val();
    const time = $('#time').val();
    const requests = $('#specialRequests').val();
    
   
    if (!name || !email || !phone || !guests || !date || !time) {
      alert('Please fill all required fields.');
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    

    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    

    let formattedTime = time;
    if (time.includes(':')) {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      if (hour < 12) {
        formattedTime = `${time} AM`;
      } else if (hour === 12) {
        formattedTime = `${time} PM`;
      } else {
        formattedTime = `${hour - 12}:${minutes} PM`;
      }
    }
    
    const confirmationDetails = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${formattedTime}</p>
      <p><strong>Number of Guests:</strong> ${guests}</p>
    `;
    
    $('#confirmationDetails').html(confirmationDetails);
    

    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    bookingModal.show();
    

    this.reset();
    

  });
  
  $('.gallery-item').hover(function() {
    $(this).find('.gallery-overlay').css('opacity', '1');
    $(this).find('.gallery-info').css('transform', 'translateY(0)');
  }, function() {
    $(this).find('.gallery-overlay').css('opacity', '0');
    $(this).find('.gallery-info').css('transform', 'translateY(20px)');
  });
  

  function initTestimonialCarousel() {
    if ($(window).width() < 768) {
      if (!$('.testimonial-slider').hasClass('slick-initialized')) {
        $('.testimonial-slider').slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true
        });
      }
    } else {
      if ($('.testimonial-slider').hasClass('slick-initialized')) {
        $('.testimonial-slider').slick('unslick');
      }
    }
  }
  
  
  initTestimonialCarousel();
  $(window).resize(function() {
    initTestimonialCarousel();
  });
  
 
  $('.newsletter-form').submit(function(e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val();
    
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    
  
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
  });
  

  function animateOnScroll() {
    $('.speciality-item, .testimonial-item, .gallery-item, .menu-item').each(function() {
      const position = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      
      if (scroll + windowHeight > position + 100) {
        $(this).addClass('animate__animated animate__fadeInUp');
      }
    });
  }
  

  $(window).scroll(function() {
    animateOnScroll();
  });

  animateOnScroll();
  
  function setActiveNavLink() {
    const scrollPosition = $(document).scrollTop() + 100;
    
    $('section').each(function() {
      const currentSection = $(this);
      const sectionTop = currentSection.offset().top;
      const sectionBottom = sectionTop + currentSection.outerHeight();
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const id = currentSection.attr('id');
        $('.navbar-nav .nav-link').removeClass('active');
        $(`.navbar-nav .nav-link[href="#${id}"]`).addClass('active');
      }
    });
  }
  
  $(window).scroll(function() {
    setActiveNavLink();
  });
  
  setActiveNavLink();
  
  function preloadImages() {
    const imgSources = [
      '/api/placeholder/1920/1080',
      '/api/placeholder/600/400',
      '/api/placeholder/400/300'
    ];
    
    imgSources.forEach(function(src) {
      const img = new Image();
      img.src = src;
    });
  }
  
  preloadImages();
  
  $('#date').change(function() {
    const selectedDate = new Date($(this).val());
    const dayOfWeek = selectedDate.getDay();
    
    $('#time').empty();
    $('#time').append('<option value="" selected disabled>Select</option>');
    
    $('#time').append('<option value="12:00">12:00 PM</option>');
    $('#time').append('<option value="12:30">12:30 PM</option>');
    $('#time').append('<option value="13:00">1:00 PM</option>');
    $('#time').append('<option value="13:30">1:30 PM</option>');
    $('#time').append('<option value="19:00">7:00 PM</option>');
    $('#time').append('<option value="19:30">7:30 PM</option>');
    $('#time').append('<option value="20:00">8:00 PM</option>');
    $('#time').append('<option value="20:30">8:30 PM</option>');
    
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      $('#time').append('<option value="21:00">9:00 PM</option>');
      $('#time').append('<option value="21:30">9:30 PM</option>');
    }
  });
  
  $('#guests').change(function() {
    const guests = $(this).val();
    
    if (guests === '7+') {
      if ($('#largeGroupNote').length === 0) {
        $('#guests').after('<small id="largeGroupNote" class="form-text text-light mt-2">For parties of 7 or more, please specify the exact number in the Special Requests section. A 10% service charge applies to groups of 8 or more.</small>');
      }
    } else {
      $('#largeGroupNote').remove();
    }
  });
  
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    $('.animate__animated').removeClass('animate__animated');
    
    $('.hero').css('height', '80vh');
  }
});