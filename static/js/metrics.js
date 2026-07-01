const metrics = {
  k_events: [],
  m_events: [],
  movement_id: 1,
  previous_epoch: Date.now() / 1000,
  focused_field: null
};

document.addEventListener('keydown', (e) => {
  metrics.k_events.push({
    Key: e.code || e.key,
    Event: 'pressed',
    'Input Box': metrics.focused_field || 'null',
    'Text Changed': document.activeElement.value || '',
    Timestamp: new Date().toISOString(),
    Epoch: (Date.now() / 1000).toString()
  });
});

document.addEventListener('keyup', (e) => {
  metrics.k_events.push({
    Key: e.code || e.key,
    Event: 'released',
    'Input Box': metrics.focused_field || 'null',
    'Text Changed': document.activeElement.value || '',
    Timestamp: new Date().toISOString(),
    Epoch: (Date.now() / 1000).toString()
  });
});

document.addEventListener('mousemove', (e) => {
  const now = Date.now() / 1000;
  if (now - metrics.previous_epoch >= 0.5) {
    metrics.m_events.push({
      Event: 'movement',
      Coordinates: [e.clientX, e.clientY],
      'Movement ID': ++metrics.movement_id,
      Timestamp: new Date().toISOString(),
      Epoch: now.toString()
    });
    metrics.previous_epoch = now;
  }
});

document.addEventListener('mousedown', (e) => {
  metrics.m_events.push({
    Event: e.button + ' press',
    Coordinates: [e.clientX, e.clientY],
    Timestamp: new Date().toISOString(),
    Epoch: (Date.now() / 1000).toString()
  });
});

document.addEventListener('mouseup', (e) => {
  metrics.m_events.push({
    Event: e.button + ' release',
    Coordinates: [e.clientX, e.clientY],
    Timestamp: new Date().toISOString(),
    Epoch: (Date.now() / 1000).toString()
  });
});

document.addEventListener('DOMContentLoaded', () => {
  ['nameInput', 'numInput', 'cvcInput', 'expMonth', 'expYear'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('focus', () => { metrics.focused_field = id; });
      el.addEventListener('blur', () => { metrics.focused_field = null; });
    }
  });
});
