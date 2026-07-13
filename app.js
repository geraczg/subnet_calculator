const form = document.querySelector("#calculatorForm");
const ipAddress = document.querySelector("#ipAddress");
const cidrRange = document.querySelector("#cidrRange");
const cidrInput = document.querySelector("#cidrInput");
const subnetCount = document.querySelector("#subnetCount");
const summaryGrid = document.querySelector("#summaryGrid");
const subnetTable = document.querySelector("#subnetTable");
const networkTag = document.querySelector("#networkTag");
const statusChip = document.querySelector("#statusChip");
const statusMessage = document.querySelector("#statusMessage");
const statusClose = document.querySelector("#statusClose");
const copyTable = document.querySelector("#copyTable");
const copyToast = document.querySelector("#copyToast");
const loadExample = document.querySelector("#loadExample");
const tablePanel = document.querySelector(".table-panel");
const segments = document.querySelectorAll(".segment");
const subnetCountField = document.querySelector("#subnetCountField");
const vlsmField = document.querySelector("#vlsmField");
const vlsmHosts = document.querySelector("#vlsmHosts");
const tableHint = document.querySelector("#tableHint");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".main-nav a");
const themeButton = document.querySelector(".theme-button");
const languageButtons = document.querySelectorAll(".language-option");
const heroTypingText = document.querySelector("#heroTypingText");
const heroVideo = document.querySelector(".hero-video");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let currentMode = "flsm";
let currentRows = [];
let currentLang = localStorage.getItem("subnetting-language") || "es";
let heroTypingTimer = null;
let copyToastTimer = null;
let lastScrollY = window.scrollY;
let headerScrollTicking = false;
const NAV_SOLID_OFFSET = 8;

const translations = {
  es: {
    "page.title": "subnet_calculator",
    "brand.title": "Calculadora de subredes",
    "nav.aria": "Navegación principal",
    "nav.home": "Inicio",
    "nav.calculator": "Calculadora",
    "nav.guide": "Guía",
    "language.aria": "Cambiar idioma",
    "theme.dark": "Cambiar a tema oscuro",
    "theme.light": "Cambiar a tema claro",
    "hero.aria": "Simula. Calcula. Entiende redes.",
    "hero.line1": "Simula.",
    "hero.line2": "Calcula.",
    "hero.copy": "Herramienta interactiva para calcular subredes IPv4 de forma rápida, precisa y visual.",
    "hero.phrase1": "Entiende redes.",
    "hero.phrase2": "Divide subredes.",
    "hero.phrase3": "Domina IPv4.",
    "network.subnet1": "SUBRED 1",
    "network.subnet2": "SUBRED 2",
    "network.subnet3": "SUBRED 3",
    "network.subnet4": "SUBRED 4",
    "capabilities.title": "¿Qué puedes <span>hacer?</span>",
    "capabilities.hosts.title": "Cálculo por hosts",
    "capabilities.hosts.copy": "Ingresa hosts necesarios y encuentra una subred adecuada.",
    "capabilities.subnets.title": "Cálculo por subredes",
    "capabilities.subnets.copy": "Define cuántas subredes necesitas y calcula parámetros automáticamente.",
    "capabilities.table.title": "Tabla de resultados",
    "capabilities.table.copy": "Visualiza rangos, broadcast, máscara y hosts útiles.",
    "capabilities.binary.title": "Formato binario",
    "capabilities.binary.copy": "Revisa direcciones IP en binario para comprender mejor.",
    "capabilities.guide.title": "Guía rápida",
    "capabilities.guide.copy": "Consulta pasos básicos para interpretar tus resultados.",
    "guide.label": "Guía rápida",
    "guide.title": "Lee una subred sin perderte en los bits.",
    "guide.item1": "<strong>Red:</strong> Dirección que identifica el inicio de una subred.",
    "guide.item2": "<strong>Máscara:</strong> Valor que separa la parte de red y la parte de hosts.",
    "guide.item3": "<strong>Prefijo:</strong> Número de bits usados para identificar la red.",
    "guide.item4": "<strong>Broadcast:</strong> Dirección final usada para enviar a todos los hosts del bloque.",
    "guide.item5": "<strong>Hosts útiles:</strong> Direcciones disponibles para asignar a dispositivos.",
    "guide.item6": "<strong>Wildcard:</strong> Máscara inversa que indica qué bits pueden variar.",
    "guide.steps.title": "Cómo funciona la calculadora",
    "guide.steps.item1": "Ingresa la dirección IP base.",
    "guide.steps.item2": "Elige el prefijo CIDR de la red.",
    "guide.steps.item3": "Selecciona FLSM o VLSM según tu caso.",
    "guide.steps.item4": "Indica cuántas subredes o hosts necesitas.",
    "guide.steps.item5": "Presiona calcular y revisa el resumen y la tabla.",
    "guide.concepts.title": "Conceptos clave",
    "calculator.label": "Calculadora",
    "calculator.heading": "Calculadora",
    "calculator.title": "Calculadora de subredes IPv4",
    "calculator.aria": "Calculadora de subnetting",
    "form.title": "Datos de red",
    "form.example": "Cargar ejemplo",
    "form.ip": "Dirección IP",
    "form.cidr": "Prefijo CIDR",
    "form.cidrHint": "Ejemplo: /24",
    "form.mode": "Modo de cálculo",
    "form.flsmHelp": "Divide la red en subredes del mismo tamaño.",
    "form.vlsmHelp": "Crea subredes de tamaños diferentes según los hosts requeridos.",
    "form.requiredSubnets": "Subredes requeridas",
    "form.hostsPerSubnet": "Hosts por subred",
    "form.hostsPlaceholder": "Ejemplo:\n60\n28\n12\n6",
    "form.calculate": "Calcular subredes",
    "results.summary": "Resumen",
    "results.binary": "Representación binaria",
    "table.title": "Tabla de subredes",
    "table.copy": "Copiar",
    "table.subnet": "Subred",
    "table.requestedHosts": "Hosts solicitados",
    "table.prefix": "Prefijo",
    "table.network": "Network",
    "table.firstHost": "Primer host",
    "table.lastHost": "Último host",
    "table.usableHosts": "Hosts útiles",
    "table.initialHint": "Primeras subredes generadas con el prefijo calculado.",
    "summary.originalTitle": "Red original",
    "summary.subnettingTitle": "Resultado del subneteo",
    "summary.enteredIp": "IP ingresada",
    "summary.baseNetwork": "Red base",
    "summary.originalMask": "Máscara",
    "summary.originalWildcard": "Wildcard",
    "summary.originalBroadcast": "Broadcast",
    "summary.binaryRepresentation": "Red en binario",
    "summary.newPrefix": "Nuevo prefijo",
    "summary.newMask": "Nueva máscara",
    "summary.newWildcard": "Nueva wildcard",
    "summary.borrowedBits": "Bits prestados",
    "summary.hostBits": "Bits para hosts",
    "summary.increment": "Incremento",
    "summary.generatedSubnets": "Subredes generadas",
    "summary.hostsPerSubnet": "Hosts por subred",
    "summary.viewCalculation": "Ver cálculo",
    "summary.calculationTitle": "Desglose del cálculo",
    "summary.originalPrefix": "Red original",
    "summary.requestedSubnets": "Subredes solicitadas",
    "summary.borrowedFormula": (bits, total) => `2^${bits} = ${formatNumber(total)}`,
    "summary.borrowedResult": (bits) => `→ Se prestan ${formatNumber(bits)} bits`,
    "summary.newPrefixFormula": (basePrefix, borrowedBits, newPrefix) =>
      `/${basePrefix} + ${formatNumber(borrowedBits)} = /${newPrefix}`,
    "summary.hostBitsFormula": (newPrefix, hostBits) => `32 − ${newPrefix} = ${formatNumber(hostBits)}`,
    "summary.hostsFormula": (hostBits, hosts) => `2^${hostBits} − 2 = ${formatNumber(hosts)}`,
    "summary.incrementFormula": (maskOctet, increment) => `256 − ${maskOctet} = ${formatNumber(increment)}`,
    "summary.variable": "Variable, ver tabla",
    "status.ready": "Listo para calcular",
    "status.completed": "Cálculo completado",
    "status.copied": "Tabla copiada al portapapeles",
    "error.missingFields": "Completa los campos requeridos para calcular.",
    "error.copy": "No se pudo copiar la tabla",
    "error.ipParts": "La IP debe tener cuatro octetos.",
    "error.ipChars": "La IP solo puede contener números y puntos.",
    "error.ipOctet": "Cada octeto debe estar entre 0 y 255.",
    "error.subnetCount": "El número de subredes debe estar entre 1 y 512.",
    "error.notEnoughBits": "No hay bits suficientes para crear tantas subredes.",
    "error.vlsmEmpty": "Escribe al menos una cantidad de hosts para VLSM.",
    "error.vlsmPositive": "Los hosts VLSM deben ser números enteros positivos.",
    "error.vlsmCapacity": "La red base no alcanza para todas las subredes VLSM.",
    "error.cidr": "El prefijo CIDR debe estar entre 1 y 32.",
    "hint.flsm": (count, cidr) => `Se muestran ${count} subredes FLSM con /${cidr}.`,
    "hint.vlsm": (used) => `VLSM ordenado de mayor a menor demanda; ${formatNumber(used)} direcciones reservadas.`,
  },
  en: {
    "page.title": "subnet_calculator",
    "brand.title": "Subnet Calculator",
    "nav.aria": "Main navigation",
    "nav.home": "Home",
    "nav.calculator": "Calculator",
    "nav.guide": "Guide",
    "language.aria": "Change language",
    "theme.dark": "Switch to dark theme",
    "theme.light": "Switch to light theme",
    "hero.aria": "Simulate. Calculate. Understand networks.",
    "hero.line1": "Simulate.",
    "hero.line2": "Calculate.",
    "hero.copy": "Interactive tool for calculating IPv4 subnets quickly, accurately, and visually.",
    "hero.phrase1": "Understand networks.",
    "hero.phrase2": "Split subnets.",
    "hero.phrase3": "Master IPv4.",
    "network.subnet1": "SUBNET 1",
    "network.subnet2": "SUBNET 2",
    "network.subnet3": "SUBNET 3",
    "network.subnet4": "SUBNET 4",
    "capabilities.title": "What can you <span>do?</span>",
    "capabilities.hosts.title": "Host-based calculation",
    "capabilities.hosts.copy": "Enter required hosts and find a suitable subnet.",
    "capabilities.subnets.title": "Subnet-based calculation",
    "capabilities.subnets.copy": "Define how many subnets you need and calculate parameters automatically.",
    "capabilities.table.title": "Results table",
    "capabilities.table.copy": "View ranges, broadcast, mask, and usable hosts.",
    "capabilities.binary.title": "Binary format",
    "capabilities.binary.copy": "Review IP addresses in binary to understand them better.",
    "capabilities.guide.title": "Quick guide",
    "capabilities.guide.copy": "Check the basic steps for reading your results correctly.",
    "guide.label": "Quick guide",
    "guide.title": "Read a subnet without getting lost in the bits.",
    "guide.item1": "<strong>Network:</strong> Address that identifies the start of a subnet.",
    "guide.item2": "<strong>Mask:</strong> Value that separates the network portion from the host portion.",
    "guide.item3": "<strong>Prefix:</strong> Number of bits used to identify the network.",
    "guide.item4": "<strong>Broadcast:</strong> Final address used to reach every host in the block.",
    "guide.item5": "<strong>Usable hosts:</strong> Addresses available to assign to devices.",
    "guide.item6": "<strong>Wildcard:</strong> Inverse mask that shows which bits can vary.",
    "guide.steps.title": "How the calculator works",
    "guide.steps.item1": "Enter the base IP address.",
    "guide.steps.item2": "Choose the network CIDR prefix.",
    "guide.steps.item3": "Select FLSM or VLSM for your case.",
    "guide.steps.item4": "Enter how many subnets or hosts you need.",
    "guide.steps.item5": "Calculate and review the summary and table.",
    "guide.concepts.title": "Key concepts",
    "calculator.label": "Calculator",
    "calculator.heading": "Calculator",
    "calculator.title": "IPv4 Subnet Calculator",
    "calculator.aria": "Subnetting calculator",
    "form.title": "Network data",
    "form.example": "Load example",
    "form.ip": "IP address",
    "form.cidr": "CIDR prefix",
    "form.cidrHint": "Example: /24",
    "form.mode": "Calculation mode",
    "form.flsmHelp": "Splits the network into equal-size subnets.",
    "form.vlsmHelp": "Creates different-size subnets based on required hosts.",
    "form.requiredSubnets": "Required subnets",
    "form.hostsPerSubnet": "Hosts per subnet",
    "form.hostsPlaceholder": "Example:\n60\n28\n12\n6",
    "form.calculate": "Calculate subnets",
    "results.summary": "Summary",
    "results.binary": "Binary representation",
    "table.title": "Subnet table",
    "table.copy": "Copy",
    "table.subnet": "Subnet",
    "table.requestedHosts": "Requested hosts",
    "table.prefix": "Prefix",
    "table.network": "Network",
    "table.firstHost": "First host",
    "table.lastHost": "Last host",
    "table.usableHosts": "Usable hosts",
    "table.initialHint": "First subnets generated with the calculated prefix.",
    "summary.originalTitle": "Original network",
    "summary.subnettingTitle": "Subnetting result",
    "summary.enteredIp": "Entered IP",
    "summary.baseNetwork": "Base network",
    "summary.originalMask": "Mask",
    "summary.originalWildcard": "Wildcard",
    "summary.originalBroadcast": "Broadcast",
    "summary.binaryRepresentation": "Network in binary",
    "summary.newPrefix": "New prefix",
    "summary.newMask": "New mask",
    "summary.newWildcard": "New wildcard",
    "summary.borrowedBits": "Borrowed bits",
    "summary.hostBits": "Host bits",
    "summary.increment": "Increment",
    "summary.generatedSubnets": "Generated subnets",
    "summary.hostsPerSubnet": "Hosts per subnet",
    "summary.viewCalculation": "View calculation",
    "summary.calculationTitle": "Calculation breakdown",
    "summary.originalPrefix": "Original network",
    "summary.requestedSubnets": "Requested subnets",
    "summary.borrowedFormula": (bits, total) => `2^${bits} = ${formatNumber(total)}`,
    "summary.borrowedResult": (bits) => `→ ${formatNumber(bits)} bits are borrowed`,
    "summary.newPrefixFormula": (basePrefix, borrowedBits, newPrefix) =>
      `/${basePrefix} + ${formatNumber(borrowedBits)} = /${newPrefix}`,
    "summary.hostBitsFormula": (newPrefix, hostBits) => `32 − ${newPrefix} = ${formatNumber(hostBits)}`,
    "summary.hostsFormula": (hostBits, hosts) => `2^${hostBits} − 2 = ${formatNumber(hosts)}`,
    "summary.incrementFormula": (maskOctet, increment) => `256 − ${maskOctet} = ${formatNumber(increment)}`,
    "summary.variable": "Variable, see table",
    "status.ready": "Ready to calculate",
    "status.completed": "Calculation completed",
    "status.copied": "Table copied to clipboard",
    "error.missingFields": "Complete the required fields to calculate.",
    "error.copy": "Could not copy the table",
    "error.ipParts": "The IP must have four octets.",
    "error.ipChars": "The IP can only contain numbers and dots.",
    "error.ipOctet": "Each octet must be between 0 and 255.",
    "error.subnetCount": "The number of subnets must be between 1 and 512.",
    "error.notEnoughBits": "There are not enough bits to create that many subnets.",
    "error.vlsmEmpty": "Enter at least one host count for VLSM.",
    "error.vlsmPositive": "VLSM hosts must be positive integers.",
    "error.vlsmCapacity": "The base network is not large enough for all VLSM subnets.",
    "error.cidr": "The CIDR prefix must be between 1 and 32.",
    "hint.flsm": (count, cidr) => `Showing ${count} FLSM subnets with /${cidr}.`,
    "hint.vlsm": (used) => `VLSM sorted from highest to lowest demand; ${formatNumber(used)} reserved addresses.`,
  },
};

if (!["es", "en"].includes(currentLang)) {
  currentLang = "es";
}

const examples = [
  { ip: "192.168.10.0", cidr: 24, subnets: 4, hosts: "60\n28\n12\n6" },
  { ip: "10.20.0.0", cidr: 16, subnets: 8, hosts: "1000\n500\n250\n120\n60" },
  { ip: "172.16.5.0", cidr: 24, subnets: 6, hosts: "70\n30\n14\n8" },
];

function t(key, ...args) {
  const value = translations[currentLang]?.[key] ?? translations.es[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

function formatNumber(value) {
  return value.toLocaleString(currentLang === "es" ? "es-MX" : "en-US");
}

function getHeroPhrases() {
  return [t("hero.phrase1"), t("hero.phrase2"), t("hero.phrase3")];
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title = t("page.title");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.setAttribute("title", t(element.dataset.i18nTitle));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const isLight = document.body.classList.contains("light-mode");
  themeButton?.setAttribute("aria-label", isLight ? t("theme.dark") : t("theme.light"));
}

function initHeroTypingText() {
  if (!heroTypingText) return;

  if (heroTypingTimer) {
    clearTimeout(heroTypingTimer);
    heroTypingTimer = null;
  }

  const phrases = getHeroPhrases();
  if (prefersReducedMotion) {
    heroTypingText.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];
    heroTypingText.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex < phrase.length) {
      charIndex += 1;
      heroTypingTimer = setTimeout(tick, 72);
      return;
    }

    if (!deleting) {
      deleting = true;
      heroTypingTimer = setTimeout(tick, 1500);
      return;
    }

    if (charIndex > 0) {
      charIndex -= 1;
      heroTypingTimer = setTimeout(tick, 34);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    heroTypingTimer = setTimeout(tick, 260);
  }

  heroTypingTimer = setTimeout(tick, 900);
}

function initCursorTrail() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (prefersReducedMotion || !canHover) return;

  const glyphs = ["0", "1", ".", "/", "IP", "24", "26", "LAN"];
  const activeNodes = new Set();
  let lastX = null;
  let lastY = null;
  let rafId = null;

  function createGlyph(x, y) {
    const el = document.createElement("span");
    el.className = "cursor-letter";
    el.textContent = glyphs[(Math.random() * glyphs.length) | 0];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--scale-from", String(0.7 + Math.random() * 0.7));
    el.style.setProperty("--scale-to", String(0.18 + Math.random() * 0.32));
    document.body.appendChild(el);
    activeNodes.add(el);
    el.addEventListener("animationend", () => {
      activeNodes.delete(el);
      el.remove();
    });
  }

  function handleMove(x, y) {
    if (lastX !== null && lastY !== null) {
      const dx = x - lastX;
      const dy = y - lastY;
      if (dx * dx + dy * dy < 96) return;
    }

    lastX = x;
    lastY = y;
    const count = Math.random() > 0.62 ? 2 : 1;
    for (let i = 0; i < count; i += 1) {
      createGlyph(x + Math.random() * 18 - 9, y + Math.random() * 18 - 9);
    }
  }

  document.addEventListener(
    "pointermove",
    (event) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        handleMove(event.clientX, event.clientY);
        rafId = null;
      });
    },
    { passive: true },
  );
}

function initScrollReveal() {
  const revealTargets = [
    ".hero-copy h1",
    ".hero-copy p",
    ".network-visual",
    ".capabilities > h2",
    ".capability-grid article",
    ".guide-section > div",
    ".guide-list li",
    ".calculator-shell .topbar",
    ".panel",
    ".metric",
    ".table-panel",
    ".binary-card",
    ".primary-button",
    ".secondary-button",
  ];

  const elements = [...document.querySelectorAll(revealTargets.join(","))];
  if (!elements.length) return;

  elements.forEach((element) => {
    element.classList.add("reveal-on-scroll");

    if (element.matches(".capability-grid article, .panel, .metric, .binary-card")) {
      element.classList.add("reveal-pop");
    }
  });

  document.querySelectorAll(".capability-set").forEach((set) => {
    [...set.querySelectorAll("article")].forEach((card, index) => {
      card.style.setProperty("--reveal-delay", `${index * 80}ms`);
    });
  });

  document.querySelectorAll(".guide-list li").forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${index * 70}ms`);
  });

  document.querySelectorAll(".panel, .metric, .binary-card").forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 60}ms`);
  });

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16,
    },
  );

  elements.forEach((element) => observer.observe(element));
}

function initHeroVideo() {
  if (!heroVideo) return;

  const isMobileVideo = window.matchMedia("(max-width: 680px)").matches;
  let rafId = null;
  let restartTimer = null;
  let fadingOut = false;

  heroVideo.controls = false;
  heroVideo.disablePictureInPicture = true;
  heroVideo.playbackRate = isMobileVideo ? 1.18 : 1;

  function fadeTo(target, duration = 700) {
    if (rafId) cancelAnimationFrame(rafId);

    const startOpacity = Number.parseFloat(heroVideo.style.opacity || "0");
    if (prefersReducedMotion) {
      heroVideo.style.opacity = String(target);
      return;
    }

    const startedAt = performance.now();
    function tick(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      heroVideo.style.opacity = String(startOpacity + (target - startOpacity) * eased);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  }

  function reveal() {
    if (prefersReducedMotion) {
      heroVideo.pause();
      heroVideo.style.opacity = "1";
      return;
    }

    heroVideo.play().catch(() => {});
    fadeTo(1, 900);
  }

  heroVideo.addEventListener("loadeddata", reveal);
  heroVideo.addEventListener("timeupdate", () => {
    const remaining = heroVideo.duration - heroVideo.currentTime;
    if (!fadingOut && Number.isFinite(remaining) && remaining > 0 && remaining <= 0.8) {
      fadingOut = true;
      fadeTo(0, 650);
    }
  });
  heroVideo.addEventListener("ended", () => {
    heroVideo.style.opacity = "0";
    restartTimer = setTimeout(() => {
      heroVideo.currentTime = 0;
      fadingOut = false;
      heroVideo.play().catch(() => {});
      fadeTo(1, 850);
    }, 120);
  });

  window.addEventListener("pagehide", () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (restartTimer) clearTimeout(restartTimer);
  });

  if (heroVideo.readyState >= 2) reveal();
}

function parseIp(ip) {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) throw new Error(t("error.ipParts"));

  return parts.reduce((value, part) => {
    if (!/^\d+$/.test(part)) throw new Error(t("error.ipChars"));
    const octet = Number(part);
    if (octet < 0 || octet > 255) throw new Error(t("error.ipOctet"));
    return ((value << 8) | octet) >>> 0;
  }, 0);
}

function ipToString(value) {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join(".");
}

function maskFromCidr(cidr) {
  if (cidr === 0) return 0;
  return (0xffffffff << (32 - cidr)) >>> 0;
}

function wildcardFromCidr(cidr) {
  return (~maskFromCidr(cidr)) >>> 0;
}

function toBinaryIp(value) {
  return [24, 16, 8, 0]
    .map((shift) => ((value >>> shift) & 255).toString(2).padStart(8, "0"))
    .join(".");
}

function hostCount(cidr) {
  if (cidr === 32) return 1;
  if (cidr === 31) return 2;
  return 2 ** (32 - cidr) - 2;
}

function totalAddresses(cidr) {
  return 2 ** (32 - cidr);
}

function firstHost(network, cidr) {
  return cidr >= 31 ? network : network + 1;
}

function lastHost(broadcast, cidr) {
  return cidr >= 31 ? broadcast : broadcast - 1;
}

function nextPowerOfTwo(value) {
  return 2 ** Math.ceil(Math.log2(Math.max(1, value)));
}

function getBaseNetwork(ipValue, cidr) {
  const mask = maskFromCidr(cidr);
  const network = (ipValue & mask) >>> 0;
  const broadcast = (network | wildcardFromCidr(cidr)) >>> 0;
  return { network, broadcast, mask };
}

function buildMetric(item) {
  return `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </article>
  `;
}

function buildCalculationStep(item) {
  return `
    <div class="calculation-step">
      ${item.label ? `<span>${item.label}</span>` : ""}
      <strong>${item.value}</strong>
    </div>
  `;
}

function buildCalculationDetails(items) {
  return `
    <details class="calculation-details">
      <summary>${t("summary.viewCalculation")}</summary>
      <div class="calculation-card" aria-label="${t("summary.calculationTitle")}">
        ${items.map(buildCalculationStep).join("")}
      </div>
    </details>
  `;
}

function buildSummary(sections) {
  summaryGrid.innerHTML = sections
    .map(
      (section) => `
        <section class="summary-section" aria-label="${section.title}">
          <h3>${section.title}</h3>
          <div class="summary-section-grid">
            ${section.items.map(buildMetric).join("")}
            ${section.calculation ? buildCalculationDetails(section.calculation) : ""}
          </div>
        </section>
      `,
    )
    .join("");
}

function uniqueValues(values) {
  return [...new Set(values)];
}

function summarizeValues(values, formatter = (value) => value) {
  const unique = uniqueValues(values);
  return unique.length === 1 ? formatter(unique[0]) : t("summary.variable");
}

function buildOriginalSummary(ipValue, cidr, base) {
  return {
    title: t("summary.originalTitle"),
    items: [
      { label: t("summary.enteredIp"), value: `${ipToString(ipValue)}/${cidr}` },
      { label: t("summary.baseNetwork"), value: `${ipToString(base.network)}/${cidr}` },
      { label: t("summary.originalMask"), value: ipToString(base.mask) },
      { label: t("summary.originalWildcard"), value: ipToString(wildcardFromCidr(cidr)) },
      { label: t("summary.originalBroadcast"), value: ipToString(base.broadcast) },
      {
        label: t("summary.binaryRepresentation"),
        value: toBinaryIp(base.network),
      },
    ],
  };
}

function getIncrementMaskOctet(cidr) {
  const octets = ipToString(maskFromCidr(cidr)).split(".").map(Number);
  for (let index = octets.length - 1; index >= 0; index -= 1) {
    if (octets[index] > 0 && octets[index] < 256) return octets[index];
  }
  return 0;
}

function buildCalculationBreakdown(rows, originalCidr) {
  if (!rows.length) return [];

  const firstCidr = rows[0].cidr;
  const borrowedBits = Math.max(firstCidr - originalCidr, 0);
  const generatedSubnets = 2 ** borrowedBits;
  const requestedSubnets = currentMode === "flsm" ? Number(subnetCount.value) : rows.length;
  const hostBits = 32 - firstCidr;
  const hosts = hostCount(firstCidr);
  const maskOctet = getIncrementMaskOctet(firstCidr);
  const increment = totalAddresses(firstCidr);

  return [
    { label: t("summary.originalPrefix"), value: `/${originalCidr}` },
    { label: t("summary.requestedSubnets"), value: formatNumber(requestedSubnets) },
    { value: t("summary.borrowedFormula", borrowedBits, generatedSubnets) },
    { value: t("summary.borrowedResult", borrowedBits) },
    { label: t("summary.newPrefix"), value: t("summary.newPrefixFormula", originalCidr, borrowedBits, firstCidr) },
    { label: t("summary.hostBits"), value: t("summary.hostBitsFormula", firstCidr, hostBits) },
    { label: t("summary.hostsPerSubnet"), value: t("summary.hostsFormula", hostBits, hosts) },
    { label: t("summary.increment"), value: t("summary.incrementFormula", maskOctet, increment) },
  ];
}

function buildSubnettingSummary(rows, originalCidr) {
  const cidrs = rows.map((row) => row.cidr);
  const blockSizes = cidrs.map(totalAddresses);

  return {
    title: t("summary.subnettingTitle"),
    items: [
      { label: t("summary.newPrefix"), value: summarizeValues(cidrs, (cidr) => `/${cidr}`) },
      { label: t("summary.newMask"), value: summarizeValues(cidrs, (cidr) => ipToString(maskFromCidr(cidr))) },
      { label: t("summary.newWildcard"), value: summarizeValues(cidrs, (cidr) => ipToString(wildcardFromCidr(cidr))) },
      {
        label: t("summary.borrowedBits"),
        value: summarizeValues(cidrs, (cidr) => Math.max(cidr - originalCidr, 0)),
      },
      { label: t("summary.hostBits"), value: summarizeValues(cidrs, (cidr) => 32 - cidr) },
      { label: t("summary.increment"), value: summarizeValues(blockSizes, formatNumber) },
      { label: t("summary.generatedSubnets"), value: formatNumber(rows.length) },
      {
        label: t("summary.hostsPerSubnet"),
        value: summarizeValues(cidrs, (cidr) => formatNumber(hostCount(cidr))),
      },
    ],
    calculation: buildCalculationBreakdown(rows, originalCidr),
  };
}

function renderTable(rows) {
  currentRows = rows;
  const showRequestedHosts = currentMode === "vlsm";
  const requestedHostsHeader = document.querySelector('[data-i18n="table.requestedHosts"]');
  if (requestedHostsHeader) {
    requestedHostsHeader.hidden = !showRequestedHosts;
  }

  subnetTable.innerHTML = rows
    .map(
      (row, index) => `
        <tr>
          <td data-label="${t("table.subnet")}">${index + 1}</td>
          ${showRequestedHosts ? `<td data-label="${t("table.requestedHosts")}">${row.requestedHosts ?? "N/A"}</td>` : ""}
          <td data-label="${t("table.prefix")}">/${row.cidr}</td>
          <td data-label="${t("table.network")}">${row.network}</td>
          <td data-label="${t("table.firstHost")}">${row.first}</td>
          <td data-label="${t("table.lastHost")}">${row.last}</td>
          <td data-label="Broadcast">${row.broadcast}</td>
          <td data-label="${t("table.usableHosts")}">${formatNumber(row.usableHosts)}</td>
        </tr>
      `,
    )
    .join("");
}

function getTableHeaders() {
  const headers = [
    t("table.subnet"),
    t("table.prefix"),
    t("table.network"),
    t("table.firstHost"),
    t("table.lastHost"),
    "Broadcast",
    t("table.usableHosts"),
  ];

  if (currentMode === "vlsm") {
    headers.splice(1, 0, t("table.requestedHosts"));
  }

  return headers;
}

function getTableValues(row, index) {
  const values = [
    index + 1,
    `/${row.cidr}`,
    row.network,
    row.first,
    row.last,
    row.broadcast,
    row.usableHosts,
  ];

  if (currentMode === "vlsm") {
    values.splice(1, 0, row.requestedHosts ?? "N/A");
  }

  return values;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPlainTable(rows) {
  const body = rows
    .map((row, index) => getTableValues(row, index).join("\t"))
    .join("\n");
  return `${getTableHeaders().join("\t")}\n${body}`;
}

function buildHtmlTable(rows) {
  const headers = getTableHeaders()
    .map(
      (header) =>
        `<th style="border:1px solid #9fb3c8;padding:6px 10px;text-align:left;background:#eaf4ff;">${escapeHtml(header)}</th>`,
    )
    .join("");
  const body = rows
    .map(
      (row, index) => `
        <tr>${getTableValues(row, index)
          .map((value) => `<td style="border:1px solid #9fb3c8;padding:6px 10px;">${escapeHtml(value)}</td>`)
          .join("")}</tr>
      `,
    )
    .join("");

  return `
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:12pt;">
      <thead><tr>${headers}</tr></thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

function calculateFlsm(ipValue, cidr) {
  const count = Number(subnetCount.value);
  if (!Number.isInteger(count) || count < 1 || count > 512) {
    throw new Error(t("error.subnetCount"));
  }

  const borrowedBits = Math.ceil(Math.log2(count));
  const subnetCidr = cidr + borrowedBits;
  if (subnetCidr > 32) throw new Error(t("error.notEnoughBits"));

  const base = getBaseNetwork(ipValue, cidr);
  const blockSize = totalAddresses(subnetCidr);
  const availableSubnets = 2 ** borrowedBits;
  const rows = [];

  for (let i = 0; i < Math.min(availableSubnets, 256); i += 1) {
    const network = (base.network + i * blockSize) >>> 0;
    const broadcast = (network + blockSize - 1) >>> 0;
    rows.push({
      cidr: subnetCidr,
      requestedHosts: null,
      network: ipToString(network),
      first: ipToString(firstHost(network, subnetCidr)),
      last: ipToString(lastHost(broadcast, subnetCidr)),
      broadcast: ipToString(broadcast),
      usableHosts: hostCount(subnetCidr),
    });
  }

  tableHint.textContent = t("hint.flsm", rows.length, subnetCidr);
  return {
    rows,
    summary: [buildOriginalSummary(ipValue, cidr, base), buildSubnettingSummary(rows, cidr)],
  };
}

function parseVlsmHosts() {
  const values = vlsmHosts.value
    .split(/[\n,; ]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map(Number);

  if (!values.length) throw new Error(t("error.vlsmEmpty"));
  if (values.some((value) => !Number.isInteger(value) || value < 1)) {
    throw new Error(t("error.vlsmPositive"));
  }

  return values.sort((a, b) => b - a);
}

function calculateVlsm(ipValue, cidr) {
  const hosts = parseVlsmHosts();
  const base = getBaseNetwork(ipValue, cidr);
  let cursor = base.network;
  const rows = [];

  for (const requiredHosts of hosts) {
    const neededAddresses = nextPowerOfTwo(requiredHosts + 2);
    const subnetCidr = 32 - Math.log2(neededAddresses);
    const broadcast = cursor + neededAddresses - 1;
    if (broadcast > base.broadcast) throw new Error(t("error.vlsmCapacity"));

    rows.push({
      cidr: subnetCidr,
      requestedHosts: requiredHosts,
      network: ipToString(cursor),
      first: ipToString(firstHost(cursor, subnetCidr)),
      last: ipToString(lastHost(broadcast, subnetCidr)),
      broadcast: ipToString(broadcast),
      usableHosts: hostCount(subnetCidr),
    });
    cursor = broadcast + 1;
  }

  const used = cursor - base.network;
  tableHint.textContent = t("hint.vlsm", used);
  return {
    rows,
    summary: [buildOriginalSummary(ipValue, cidr, base), buildSubnettingSummary(rows, cidr)],
  };
}

function setStatus(message, type = "ok") {
  statusMessage.textContent = message;
  statusChip.classList.toggle("error", type === "error");
  statusChip.hidden = false;
}

function hideStatus() {
  statusChip.hidden = true;
  statusChip.classList.remove("error");
}

function hasMissingRequiredFields() {
  return (
    !ipAddress.value.trim() ||
    !cidrInput.value.trim() ||
    (currentMode === "flsm" && !subnetCount.value.trim()) ||
    (currentMode === "vlsm" && !vlsmHosts.value.trim())
  );
}

function showCopyToast(message, type = "ok") {
  copyToast.textContent = message;
  copyToast.classList.toggle("error", type === "error");
  copyToast.classList.add("show");
  copyTable.classList.toggle("copied", type !== "error");

  window.clearTimeout(copyToastTimer);
  copyToastTimer = window.setTimeout(() => {
    copyToast.classList.remove("show");
    copyTable.classList.remove("copied");
  }, 2200);
}

function calculate(showCompletion = false) {
  try {
    const cidr = Number(cidrInput.value);
    if (!Number.isInteger(cidr) || cidr < 1 || cidr > 32) {
      throw new Error(t("error.cidr"));
    }

    const ipValue = parseIp(ipAddress.value);
    const result = currentMode === "flsm" ? calculateFlsm(ipValue, cidr) : calculateVlsm(ipValue, cidr);
    const base = getBaseNetwork(ipValue, cidr);

    networkTag.textContent = `${ipToString(base.network)}/${cidr}`;
    buildSummary(result.summary);
    renderTable(result.rows);
    hideStatus();
    return true;
  } catch (error) {
    if (showCompletion && hasMissingRequiredFields()) {
      setStatus(t("error.missingFields"), "error");
    } else if (showCompletion) {
      setStatus(error.message, "error");
    } else {
      hideStatus();
    }
    return false;
  }
}

function scrollToSubnetTable() {
  siteHeader.classList.add("nav-scrolled");
  tablePanel.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

function updateHeaderVisibility() {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;

  siteHeader.classList.toggle("nav-scrolled", currentScrollY >= NAV_SOLID_OFFSET);

  if (currentScrollY < 80) {
    siteHeader.classList.remove("nav-hidden");
  } else if (delta > 8) {
    siteHeader.classList.add("nav-hidden");
  } else if (delta < -8) {
    siteHeader.classList.remove("nav-hidden");
  }

  lastScrollY = currentScrollY;
  headerScrollTicking = false;
}

function handleHeaderScroll() {
  if (headerScrollTicking) return;
  headerScrollTicking = true;
  window.requestAnimationFrame(updateHeaderVisibility);
}

function syncCidr(value) {
  cidrRange.value = value;
  cidrInput.value = value;
  calculate();
}

segments.forEach((segment) => {
  segment.addEventListener("click", () => {
    currentMode = segment.dataset.mode;
    segments.forEach((item) => item.classList.toggle("active", item === segment));
    subnetCountField.classList.toggle("hidden", currentMode !== "flsm");
    vlsmField.classList.toggle("hidden", currentMode !== "vlsm");
    calculate();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (hasMissingRequiredFields()) {
    setStatus(t("error.missingFields"), "error");
    return;
  }
  if (calculate(true)) {
    scrollToSubnetTable();
  }
});

cidrRange.addEventListener("input", (event) => syncCidr(event.target.value));
cidrInput.addEventListener("input", (event) => syncCidr(event.target.value));
subnetCount.addEventListener("input", calculate);
ipAddress.addEventListener("input", () => {
  if (/[^\d.]/.test(ipAddress.value)) {
    setStatus(t("error.ipChars"), "error");
    return;
  }
  calculate();
});
vlsmHosts.addEventListener("input", calculate);
statusClose.addEventListener("click", hideStatus);

copyTable.addEventListener("click", async () => {
  try {
    const text = buildPlainTable(currentRows);
    const html = buildHtmlTable(currentRows);

    if (navigator.clipboard.write && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
    } else {
      await navigator.clipboard.writeText(text);
    }

    showCopyToast(t("status.copied"));
  } catch {
    showCopyToast(t("error.copy"), "error");
  }
});

loadExample.addEventListener("click", () => {
  const current = examples.shift();
  examples.push(current);
  ipAddress.value = current.ip;
  subnetCount.value = current.subnets;
  vlsmHosts.value = current.hosts;
  syncCidr(current.cidr);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.toggle("active", item === link));
    siteHeader.classList.remove("nav-hidden");
  });
});

function syncActiveNav() {
  const currentHash = window.location.hash || "#inicio";
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentHash);
  });
}

window.addEventListener("hashchange", syncActiveNav);
window.addEventListener("scroll", handleHeaderScroll, { passive: true });

themeButton?.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-mode");
  themeButton.setAttribute("aria-label", isLight ? t("theme.dark") : t("theme.light"));
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang;
    localStorage.setItem("subnetting-language", currentLang);
    applyTranslations();
    calculate();
    initHeroTypingText();
  });
});

applyTranslations();
hideStatus();
calculate();
syncActiveNav();
siteHeader.classList.toggle("nav-scrolled", window.scrollY >= NAV_SOLID_OFFSET);
initHeroTypingText();
initCursorTrail();
initHeroVideo();
