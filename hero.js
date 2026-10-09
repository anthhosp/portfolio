(function() {
  const canvas = document.getElementById('network-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, nodes, packets;

  const NC   = 50;
  const LD   = 200;
  const NC_  = 'rgba(79,142,247,0.95)';
  const LC   = 'rgba(79,142,247,0.22)';
  const GC   = 'rgba(79,142,247,0.55)';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeNodes() {
    nodes = [];
    for (let i = 0; i < NC; i++) {
      nodes.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - .5) * .25,
        vy: (Math.random() - .5) * .25,
        r:  Math.random() < .15 ? 4.5 : Math.random() < .4 ? 3 : 2
      });
    }
  }

  function getEdges() {
    const e = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx*dx + dy*dy) < LD) e.push({a:i, b:j});
      }
    return e;
  }

  function spawnPacket() {
    const e = getEdges();
    if (!e.length) return;
    const ed = e[Math.floor(Math.random() * e.length)];
    packets.push({ a:ed.a, b:ed.b, t:Math.random(), speed:.0013+Math.random()*.002, dir:Math.random()<.5?1:-1 });
  }

  function makePackets() { packets = []; for (let i = 0; i < 30; i++) spawnPacket(); }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const edges = getEdges();

    ctx.strokeStyle = LC; ctx.lineWidth = 1.1;
    for (const e of edges) {
      ctx.beginPath();
      ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
      ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
      ctx.stroke();
    }

    for (const n of nodes) {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
      g.addColorStop(0, GC); g.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI*2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = NC_; ctx.fill();
    }

    for (const p of packets) {
      const na = nodes[p.a], nb = nodes[p.b];
      const t  = p.dir === 1 ? p.t : 1 - p.t;
      const x  = na.x + (nb.x - na.x) * t;
      const y  = na.y + (nb.y - na.y) * t;
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#4f8ef7'; ctx.shadowBlur = 12;
      ctx.fill(); ctx.shadowBlur = 0;
    }
  }

  function update() {
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    for (let i = packets.length - 1; i >= 0; i--) {
      packets[i].t += packets[i].speed;
      if (packets[i].t > 1) { packets.splice(i, 1); spawnPacket(); }
    }
    while (packets.length < 30) spawnPacket();
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }

  window.addEventListener('resize', () => { resize(); makeNodes(); });
  resize(); makeNodes(); makePackets(); loop();
})();
