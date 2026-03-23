document.addEventListener('DOMContentLoaded', function () {
    function openTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
        const target = document.getElementById(tabName);
        if (target) target.classList.add('active');
        const btn = document.querySelector(`.tab[data-tab="${tabName}"]`);
        if (btn) btn.classList.add('active');
    }

    document.querySelectorAll('.tab[data-tab]').forEach(button => {
        button.addEventListener('click', () => {
            openTab(button.dataset.tab);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            if (e.key === '1') { openTab('students'); e.preventDefault(); }
            if (e.key === '2') { openTab('technical'); e.preventDefault(); }
            if (e.key === '3') { openTab('login-editor'); e.preventDefault(); }
            if (e.key === '4') { openTab('login-admin'); e.preventDefault(); }
        }
    });

    if (!document.querySelector('.tab-content.active')) {
        openTab('students');
    }
});