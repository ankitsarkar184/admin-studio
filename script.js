const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const toast = $('#toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  $('#themeToggle').textContent = dark ? '☾' : '☼';
  notify(dark ? 'Dark theme enabled' : 'Light theme enabled');
});

$('#mobileMenu').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$$('.nav-link').forEach(button => button.addEventListener('click', () => {
  $$('.nav-link').forEach(link => link.classList.remove('active'));
  button.classList.add('active');
  const page = button.dataset.page;
  $('#breadcrumbPage').textContent = page;
  $('#pageTitle').innerHTML = page === 'Overview' ? 'Good morning, Ankit <span class="wave">✦</span>' : `${page} <span class="wave">✦</span>`;
  $('#pageSubtitle').textContent = page === 'Overview' ? 'Here’s what’s happening with your store today.' : `Your ${page.toLowerCase()} workspace at a glance. This demo view is ready for customization.`;
  $('#sidebar').classList.remove('open');
  if (page !== 'Overview') notify(`${page} selected — connect your data to enable this section.`);
}));

$('#globalSearch').addEventListener('input', e => {
  const term = e.target.value.toLowerCase().trim();
  let shown = 0;
  $$('#ordersTable tbody tr').forEach(row => {
    const match = row.textContent.toLowerCase().includes(term);
    row.hidden = !match;
    if (match) shown++;
  });
  if (term) $('#tableCount').innerHTML = `Showing <strong>${shown}</strong> matching orders`;
  else $('#tableCount').innerHTML = 'Showing <strong>4</strong> of <strong>8</strong> orders';
});
$('#orderSearch').addEventListener('input', e => {
  const term = e.target.value.toLowerCase().trim();
  let shown = 0;
  $$('#ordersTable tbody tr').forEach(row => {
    const match = row.textContent.toLowerCase().includes(term);
    row.hidden = !match;
    if (match) shown++;
  });
  $('#tableCount').innerHTML = `Showing <strong>${shown}</strong> matching orders`;
});
$('#selectAll').addEventListener('change', e => {
  $$('.row-check').forEach(box => box.checked = e.target.checked);
  notify(e.target.checked ? 'Visible orders selected' : 'Order selection cleared');
});
$$('.row-check').forEach(box => box.addEventListener('change', () => {
  const selected = $$('.row-check:checked').length;
  if (selected) notify(`${selected} order${selected === 1 ? '' : 's'} selected`);
}));
$('#exportBtn').addEventListener('click', () => {
  const rows = [['Order','Customer','Email','Date','Amount','Status']];
  $$('#ordersTable tbody tr').filter(row => !row.hidden).forEach(row => {
    const cells = row.querySelectorAll('td');
    rows.push([cells[1].textContent.trim(), cells[2].querySelector('strong').textContent, cells[2].querySelector('small').textContent, cells[3].textContent.trim(), cells[4].textContent.trim(), cells[5].textContent.trim()]);
  });
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"','""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'ankit-admin-orders.csv'; link.click();
  URL.revokeObjectURL(url);
  notify('Orders exported as CSV');
});
$('#dateBtn').addEventListener('click', () => {
  const options = ['Last 7 days','Last 30 days','Last 90 days'];
  const current = $('#dateBtn span').textContent;
  const next = options[(options.indexOf(current) + 1) % options.length];
  $('#dateBtn span').textContent = next;
  notify(`Date range set to ${next} (sample metrics)`);
});
$('#chartRange').addEventListener('change', e => {
  const paths = {
    week: 'M0 155 C45 130 60 170 100 115 S160 145 200 90 S270 120 310 80 S370 105 420 70 S490 95 540 45 S620 70 700 22',
    month: 'M0 180 C35 160 55 170 85 140 S140 155 175 120 S230 135 265 100 S320 130 350 92 S410 110 440 65 S500 90 530 52 S590 75 620 35 S670 55 700 18',
    year: 'M0 185 C55 175 65 140 120 155 S180 110 230 125 S290 70 350 100 S410 55 470 78 S520 35 580 55 S640 25 700 12'
  };
  const d = paths[e.target.value];
  $('#chartLine').setAttribute('d', d);
  $('#chartArea').setAttribute('d', `${d} L700 210 L0 210Z`);
  const labels = {week:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],month:['May 01','May 05','May 10','May 15','May 20','May 25','May 30'],year:['Jan','Feb','Mar','Apr','May','Jun','Jul']};
  $('#chartLabels').innerHTML = labels[e.target.value].map(label => `<span>${label}</span>`).join('');
  notify(`Chart updated: ${e.target.options[e.target.selectedIndex].text}`);
});
$('#notificationsBtn').addEventListener('click', () => notify('You’re all caught up — no new notifications.'));
$('#upgradeBtn').addEventListener('click', () => notify('Workspace settings are a demo placeholder.'));
$('#viewAllBtn').addEventListener('click', () => notify('All orders are not connected yet. Add your API or database to load live orders.'));
$$('.row-more').forEach(button => button.addEventListener('click', () => notify('Order actions are a demo placeholder.')));
$$('.pagination button:not(:disabled)').forEach(button => button.addEventListener('click', () => {
  if (button.textContent.trim() !== '1' && button.textContent.trim() !== '‹' && button.textContent.trim() !== '›') return;
  notify('Pagination is a visual demo. Connect your order data for real pages.');
}));
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault(); $('#globalSearch').focus();
  }
  if (e.key === 'Escape') $('#sidebar').classList.remove('open');
});
