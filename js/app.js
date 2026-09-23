/**
 * Yayasan Inovasi Hijau Lestari - Main JavaScript Application
 * Modern, accessible, and responsive interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initImpactCounters();
  initActivityTabs();
  initActivityModal();
  initCollaborationModal();
  initContactForm();
  initNewsletterForm();
  initFaqAccordion();
  initBackToTop();
});

/* ==========================================================================
   1. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* ==========================================================================
   2. Sticky Navbar Styling on Scroll
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-md', 'bg-white/95');
      navbar.classList.remove('bg-[#fbf9f5]/90');
    } else {
      navbar.classList.remove('shadow-md', 'bg-white/95');
      navbar.classList.add('bg-[#fbf9f5]/90');
    }
  });
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.add('opacity-100'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   4. Scrollspy (Highlight active navigation item)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      link.classList.remove('text-[#2d6a4f]', 'font-bold');
      link.classList.add('text-gray-700');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#2d6a4f]', 'font-bold');
        link.classList.remove('text-gray-700');
      }
    });
  });
}

/* ==========================================================================
   5. Animated Impact Counter (Intersection Observer)
   ========================================================================== */
function initImpactCounters() {
  const counterSection = document.getElementById('impact-section');
  if (!counterSection) return;

  let animated = false;
  const counters = document.querySelectorAll('.counter-val');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let currentVal = 0;

          const timer = setInterval(() => {
            currentVal += increment;
            if (currentVal >= target) {
              currentVal = target;
              clearInterval(timer);
            }
            counter.innerText = `${prefix}${Math.floor(currentVal).toLocaleString('id-ID')}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(counterSection);
}

/* ==========================================================================
   6. Activity Tabs & Filter
   ========================================================================== */
function initActivityTabs() {
  const tabButtons = document.querySelectorAll('.activity-tab-btn');
  const activityCards = document.querySelectorAll('.activity-card');

  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      tabButtons.forEach(b => {
        b.classList.remove('active', 'bg-[#1b4332]', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
      });

      // Add active to clicked tab
      btn.classList.add('active', 'bg-[#1b4332]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

      const filter = btn.getAttribute('data-filter');

      activityCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Activity Detail Modal Data & Handler
   ========================================================================== */
const activityDetails = {
  'sekolah-lapang': {
    title: 'Sekolah Lapang Ekologi Pertanian',
    category: 'Edukasi Lapang & Pelatihan Petani',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=1200&q=80',
    description: 'Program pembelajaran dua arah berbasis praktik langsung di sawah dan kebun tanpa kimia sintetis. Petani diajak memahami agroekosistem tanah, rantai makanan hayati, serta strategi budidaya regeneratif.',
    highlights: [
      'Dilaksanakan 12 kali pertemuan intensif per musim tanam.',
      'Praktik langsung uji kesuburan tanah dan mikrobiologi sederhana.',
      'Penyusunan kalender tanam adaptif perubahan iklim.',
      'Telah meluluskan lebih dari 1.400 alumni petani pelopor di 28 desa.'
    ],
    impact: 'Penurunan biaya input pupuk & pestisida kimia sintetis hingga 45-60% pada musim tanam kedua.'
  },
  'pupuk-hayat-cair': {
    title: 'Pelatihan Pembuatan Pupuk Hayati Cair (PHC)',
    category: 'Inovasi Pupuk & Hayati',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    description: 'Pelatihan praktis memanfaatkan potensi lokal limbah cucian tahu, air kelapa, kotoran ternak, dan molasses menjadi pupuk hayati cair super aktif kaya mikroba pengikat nitrogen dan pelarut fosfat.',
    highlights: [
      'Formula starter mikroorganisme lokal (MOL) mandiri.',
      'SOP fermentasi anaerobik menggunakan tong drum sederhana.',
      'Uji kualitas PHC mandiri sebelum diaplikasikan ke tanaman pangan.',
      'Kapasitas produksi mandiri kelompok tani rata-rata 500 liter/minggu.'
    ],
    impact: 'Peningkatan bobot bulir gabah dan daya tahan tanaman terhadap kekeringan hingga 25%.'
  },
  'pengendalian-hama-pht': {
    title: 'Workshop Pengendalian Hama Terpadu (PHT)',
    category: 'PHT & Ekologi Lingkungan',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1200&q=80',
    description: 'Strategi pengelolaan hama ramah lingkungan yang menyeimbangkan ekosistem kebun. Mengedukasi petani mengenali musuh alami predator hama dan cara meracik pestisida nabati (mimba, sambiloto, sereh wangi, tembakau).',
    highlights: [
      'Identifikasi serangga hama vs serangga sahabat petani di sawah.',
      'Teknik ekstraksi dingin dan panas biopestisida ramah lingkungan.',
      'Penanaman tanaman refugia (bunga matahari, kenikir) di pematang sawah.',
      'Pencegahan resistensi hama akibat residu bahan kimia sintetis berlebih.'
    ],
    impact: 'Nol kasus keracunan pestisida kimia di kelompok binaan serta terciptanya ekosistem sawah alami.'
  },
  'fasilitasi-sertifikasi': {
    title: 'Fasilitasi Sertifikasi & Legalitas Produk Tani',
    category: 'Sertifikasi & Legalitas',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80',
    description: 'Bimbingan teknis intensif dari audit dokumen, penyusunan Sistem Penjaminan Mutu Internal (ICS), hingga pengajuan sertifikasi resmi Organik Indonesia (SNI), sertifikasi Halal, dan Pendaftaran PSAT (Pangan Segar Asal Tumbuhan).',
    highlights: [
      'Pendampingan penyusunan dokumen traceability riwayat lahan.',
      'Fasilitasi inspeksi lapangan bersama Lembaga Sertifikasi Organik (LSO).',
      'Skema sertifikasi kelompok (Group Certification) untuk menekan biaya audit.',
      '85+ kelompok produk tani berhasil mengantongi sertifikat resmi.'
    ],
    impact: 'Meningkatkan nilai jual hasil panen petani 30-50% lebih tinggi dibandingkan harga pasar tengkulak biasa.'
  },
  'pasar-csa': {
    title: 'Fasilitas Pasar & Kemandirian Ekonomi (CSA)',
    category: 'Akses Pasar & Ekonomi Petani',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    description: 'Menghubungkan rantai pasok pendek antara petani produsen dengan konsumen perkotaan, kafe, restoran, serta supermarket organik melalui model Community Supported Agriculture (CSA) dan platform digital.',
    highlights: [
      'Model langganan keranjang sayur & beras organik berkala.',
      'Kontrak serap gabah dan hortikultura dengan harga batas bawah terjamin.',
      'Pelatihan standarisasi grading, sortasi, dan kemasan eco-friendly.',
      'Penyediaan fasilitas pendingin mikro (cold storage) terjangkau di sentra tani.'
    ],
    impact: 'Memutus rantai tengkulak hingga 3 lapis, memastikan margin keuntungan langsung diterima oleh keluarga petani.'
  }
};

function initActivityModal() {
  const modal = document.getElementById('activity-modal');
  const modalBox = modal ? modal.querySelector('.modal-box') : null;
  const closeBtn = document.getElementById('close-activity-modal');
  const triggerBtns = document.querySelectorAll('.open-activity-detail');

  if (!modal) return;

  function openActivity(key) {
    const data = activityDetails[key];
    if (!data) return;

    document.getElementById('modal-act-title').innerText = data.title;
    document.getElementById('modal-act-category').innerText = data.category;
    document.getElementById('modal-act-img').src = data.image;
    document.getElementById('modal-act-desc').innerText = data.description;
    document.getElementById('modal-act-impact').innerText = data.impact;

    const highlightsList = document.getElementById('modal-act-highlights');
    highlightsList.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2.5 text-sm text-gray-600';
      li.innerHTML = `
        <span class="text-[#2d6a4f] mt-0.5"><i class="fa-solid fa-check-circle"></i></span>
        <span>${item}</span>
      `;
      highlightsList.appendChild(li);
    });

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.add('open');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeActivity() {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-activity');
      openActivity(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeActivity);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeActivity();
  });
}

/* ==========================================================================
   8. Collaboration & "Dukung Petani" Modal
   ========================================================================== */
function initCollaborationModal() {
  const modal = document.getElementById('collab-modal');
  const closeBtn = document.getElementById('close-collab-modal');
  const openButtons = document.querySelectorAll('.open-collab-modal');
  const tabButtons = document.querySelectorAll('.collab-tab-btn');
  const tabPanes = document.querySelectorAll('.collab-tab-pane');

  if (!modal) return;

  function openModal(defaultTab = 'donasi') {
    switchTab(defaultTab);
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.add('open');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  function switchTab(tabId) {
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('border-[#2d6a4f]', 'text-[#2d6a4f]', 'bg-emerald-50/50');
        btn.classList.remove('border-transparent', 'text-gray-500');
      } else {
        btn.classList.remove('border-[#2d6a4f]', 'text-[#2d6a4f]', 'bg-emerald-50/50');
        btn.classList.add('border-transparent', 'text-gray-500');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === `collab-pane-${tabId}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preferredTab = btn.getAttribute('data-default-tab') || 'donasi';
      openModal(preferredTab);
    });
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Donation Amount Selection Buttons
  const amountBtns = document.querySelectorAll('.donation-amt-btn');
  const customAmountInput = document.getElementById('custom-donation-amount');

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('border-[#2d6a4f]', 'bg-emerald-50', 'text-[#1b4332]'));
      btn.classList.add('border-[#2d6a4f]', 'bg-emerald-50', 'text-[#1b4332]');
      if (customAmountInput) {
        customAmountInput.value = btn.getAttribute('data-amount');
      }
    });
  });

  // Forms inside modal
  const donationForm = document.getElementById('donation-form');
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Terima kasih! Niat mulia Anda untuk mendukung petani lestari sedang diproses. Konfirmasi telah dikirim.', 'success');
      donationForm.reset();
    });
  }

  const partnershipForm = document.getElementById('partnership-form');
  if (partnershipForm) {
    partnershipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Proposal kemitraan diterima! Tim divisi kerjasama yayasan akan menghubungi lembaga Anda dalam 1x24 jam kerja.', 'success');
      partnershipForm.reset();
    });
  }

  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Pendaftaran relawan terkirim! Selamat bergabung di barisan pejuang kedaulatan pangan hijau.', 'success');
      volunteerForm.reset();
    });
  }
}

/* ==========================================================================
   9. Contact Form Validation & Toast Notification
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Mohon lengkapi seluruh formulir yang bertanda wajib.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Mengirim Pesan...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast('Pesan Anda berhasil terkirim! Tim Yayasan Inovasi Hijau Lestari akan merespons melalui WhatsApp/Email Anda segera.', 'success');
    }, 1200);
  });
}

/* ==========================================================================
   10. Newsletter Form
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      showToast('Terima kasih telah berlangganan Nawala Kabar Tani Lestari!', 'success');
      emailInput.value = '';
    }
  });
}

/* ==========================================================================
   11. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(i => {
        i.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   12. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.add('opacity-100', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconClass = type === 'success' ? 'fa-solid fa-circle-check text-[#2d6a4f]' : 'fa-solid fa-circle-exclamation text-[#b85d3b]';
  const borderCol = type === 'success' ? '#2d6a4f' : '#b85d3b';
  toast.style.borderLeftColor = borderCol;

  toast.innerHTML = `
    <div class="text-xl ${iconClass}"></div>
    <div class="flex-1 text-sm font-medium text-gray-800 leading-snug">${message}</div>
    <button class="text-gray-400 hover:text-gray-600 text-xs ml-2" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark text-sm"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}
