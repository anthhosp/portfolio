(function () {
  var DATA = {
    1: {
      t: "Support et mise à disposition de services informatiques",
      def: "Que les utilisateurs puissent bosser sans accroc, et réparer vite quand quelque chose casse.",
      school: "J'ai monté GLPI dans un conteneur LXC pour gérer un parc et des tickets de bout en bout, dans le projet GSB.",
      work: "Au helpdesk de Kem One, je prends les incidents : un poste qui ne démarre plus, une imprimante en rade. Je diagnostique, je règle ou j'escalade au N2, et tout est tracé dans GLPI.",
      chips: {
        school: ["GLPI", "LXC", "Projet GSB"],
        work: ["Helpdesk N1", "GLPI", "Windows 10/11", "Escalade N2"]
      }
    },
    2: {
      t: "Administration des systèmes et des réseaux",
      def: "Installer, configurer, surveiller : faire tourner les serveurs et le réseau.",
      school: "Je déploie des services (DNS avec BIND9, Apache2, Nginx en reverse proxy) sur Proxmox avec Terraform et Ansible, puis je cloisonne avec des VLAN et des règles iptables. Chez moi, le homelab prolonge tout ça en continu.",
      work: "Sur l'Active Directory de Kem One, je gère les comptes, les groupes de sécurité et les GPO. J'ai aussi développé un outil interne d'inventaire AD et de stock matériel.",
      chips: {
        school: ["Proxmox", "Terraform", "Ansible", "BIND9", "Nginx", "VLAN"],
        work: ["Active Directory", "GPO", "Groupes de sécurité", "Outil interne"]
      }
    },
    3: {
      t: "Cybersécurité des services informatiques",
      def: "Protéger les accès et les données, et anticiper les menaces plutôt que les subir.",
      school: "On apprend à segmenter le réseau et à filtrer : VLAN, iptables, et OPNsense sur mon homelab. Et je suis les CVE critiques dans ma veille technologique.",
      work: "Les droits passent par l'AD, le trafic traverse un proxy SSL d'entreprise, et ma veille cible les failles qui touchent nos équipements, comme celle des NAS QNAP.",
      chips: {
        school: ["VLAN", "iptables", "OPNsense", "Veille CVE"],
        work: ["Droits AD", "Proxy SSL", "Veille QNAP"]
      }
    }
  };

  var lab = document.getElementById("lab");
  if (!lab) return;
  var panel = document.getElementById("labPanel");
  var nodes = lab.querySelectorAll(".nd");
  var links = lab.querySelectorAll(".lk");
  var tgl = lab.querySelectorAll(".lp-toggle button");
  var cur = 1, side = "school", timer;

  function render(animate) {
    var d = DATA[cur];
    document.getElementById("lpK").textContent = "Bloc " + cur;
    document.getElementById("lpT").textContent = d.t;
    document.getElementById("lpDef").textContent = d.def;
    document.getElementById("lpText").textContent = d[side];
    document.getElementById("lpChips").innerHTML = d.chips[side].map(function (c, i) {
      return '<span class="lp-chip" style="animation-delay:' + (i * 70) + 'ms">' + c + "</span>";
    }).join("");
    nodes.forEach(function (n) { n.classList.toggle("on", +n.dataset.bloc === cur); });
    links.forEach(function (l) { l.classList.toggle("on", +l.dataset.bloc === cur); });
    tgl.forEach(function (b) { b.classList.toggle("on", b.dataset.side === side); });
    if (animate) {
      panel.classList.remove("swap");
      void panel.offsetWidth;
      panel.classList.add("swap");
    }
  }

  function stop() { clearInterval(timer); lab.classList.add("touched"); }

  nodes.forEach(function (n) {
    function pick() { stop(); cur = +n.dataset.bloc; render(true); }
    n.addEventListener("click", pick);
    n.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); }
    });
  });

  tgl.forEach(function (b) {
    b.addEventListener("click", function () { stop(); side = b.dataset.side; render(true); });
  });

  lab.addEventListener("mouseenter", stop);

  render(false);
  timer = setInterval(function () { cur = (cur % 3) + 1; render(true); }, 7000);
})();
