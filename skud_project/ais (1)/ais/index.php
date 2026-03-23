<?php
session_start();

$EDITOR_PASSWORD = 'editor123';
$ADMIN_PASSWORD  = 'admin123';

// === Обработка входа ===
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password']) && isset($_POST['role'])) {
    if ($_POST['role'] === 'editor' && $_POST['password'] === $EDITOR_PASSWORD) {
        $_SESSION['is_editor'] = true;
    } elseif ($_POST['role'] === 'admin' && $_POST['password'] === $ADMIN_PASSWORD) {
        $_SESSION['is_admin'] = true;
    }
}

// === Выход ===
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// === Сохранение ТЗ ===
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['technical'])) {
    if (!empty($_SESSION['is_editor'])) {
        $data = ['technical' => $_POST['technical']];
        file_put_contents(__DIR__ . '/data/content.json', json_encode($data, JSON_UNESCAPED_UNICODE));
        header('Location: index.php');
        exit;
    }
}

// === Добавление студента ===
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_student'])) {
    if (!empty($_SESSION['is_admin'])) {
        $name = trim($_POST['name']);
        $group = trim($_POST['group']);
        $course = trim($_POST['course']);
        if ($name && $group && $course) {
            $studentsFile = __DIR__ . '/data/students.json';
            $students = file_exists($studentsFile) ? json_decode(file_get_contents($studentsFile), true) : [];
            $parts = explode(' ', $name);
            $initials = (count($parts) >= 2)
                ? mb_strtoupper(mb_substr($parts[0], 0, 1) . mb_substr($parts[1], 0, 1))
                : mb_strtoupper(mb_substr($name, 0, 2));
            $students[] = ['name' => $name, 'group' => $group, 'course' => $course, 'initials' => $initials];
            file_put_contents($studentsFile, json_encode($students, JSON_UNESCAPED_UNICODE));
            header('Location: index.php');
            exit;
        }
    }
}

// === Удаление студента ===
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_student']) && isset($_POST['index'])) {
    if (!empty($_SESSION['is_admin'])) {
        $index = (int)$_POST['index'];
        $studentsFile = __DIR__ . '/data/students.json';
        if (file_exists($studentsFile)) {
            $students = json_decode(file_get_contents($studentsFile), true);
            if (isset($students[$index])) {
                array_splice($students, $index, 1);
                file_put_contents($studentsFile, json_encode($students, JSON_UNESCAPED_UNICODE));
            }
        }
        header('Location: index.php');
        exit;
    }
}

// === Загрузка данных ===
$technicalText = 'Техническое задание отсутствует.';
if (file_exists(__DIR__ . '/data/content.json')) {
    $content = json_decode(file_get_contents(__DIR__ . '/data/content.json'), true);
    $technicalText = $content['technical'] ?? $technicalText;
}
$technicalText = htmlspecialchars($technicalText);

$students = [];
if (file_exists(__DIR__ . '/data/students.json')) {
    $students = json_decode(file_get_contents(__DIR__ . '/data/students.json'), true);
}
if (empty($students)) {
    $students = [
        ['name' => 'Журавлев Кирилл', 'group' => 'ПРО-438Б', 'course' => '4', 'initials' => 'ЖК'],
        ['name' => 'Газизов Арслан', 'group' => 'ПРО-438Б', 'course' => '4', 'initials' => 'ГА'],
        ['name' => 'Юсупов Рамиль', 'group' => 'ПРО-438Б', 'course' => '4', 'initials' => 'ЮР']
    ];
    file_put_contents(__DIR__ . '/data/students.json', json_encode($students, JSON_UNESCAPED_UNICODE));
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Система управления</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <div class="header-content">
            <h1>Информация о системе управления доступом к помещению</h1>
        </div>
    </header>

    <div class="container">
        <div class="tabs">
            <button class="tab" data-tab="students">Студенты</button>
            <button class="tab" data-tab="technical">Техническое задание</button>
            <?php if (!isset($_SESSION['is_editor'])): ?>
                <button class="tab" data-tab="login-editor">Редактор</button>
            <?php endif; ?>
            <?php if (!isset($_SESSION['is_admin'])): ?>
                <button class="tab" data-tab="login-admin">Админка</button>
            <?php endif; ?>
        </div>

        <!-- Студенты -->
        <div id="students" class="tab-content">
            <h2>Список студентов</h2>
            <div class="students-container">
                <?php foreach ($students as $i => $s): ?>
                <div class="student-card">
                    <div class="student-avatar"><span><?= htmlspecialchars($s['initials']) ?></span></div>
                    <div class="student-info">
                        <h3><?= htmlspecialchars($s['name']) ?></h3>
                        <p class="student-group">Группа: <?= htmlspecialchars($s['group']) ?></p>
                        <p class="student-course">Курс: <?= htmlspecialchars($s['course']) ?></p>
                    </div>
                    <?php if (isset($_SESSION['is_admin'])): ?>
                        <form method="POST" style="margin-left: auto; display: flex; align-items: center;">
                            <input type="hidden" name="index" value="<?= $i ?>">
                            <button type="submit" name="delete_student" class="btn-delete" 
                                    onclick="return confirm('Удалить студента?')">Удалить</button>
                        </form>
                    <?php endif; ?>
                </div>
                <?php endforeach; ?>
            </div>

            <?php if (isset($_SESSION['is_admin'])): ?>
                <h3 style="margin-top: 30px;">Добавить студента</h3>
                <form method="POST">
                    <input type="text" name="name" placeholder="ФИО" required>
                    <input type="text" name="group" placeholder="Группа" required>
                    <input type="number" name="course" placeholder="Курс" min="1" max="6" required>
                    <button type="submit" name="add_student">Добавить</button>
                    <a href="?logout=1">Выйти из админки</a>
                </form>
            <?php endif; ?>
        </div>

        <!-- Техническое задание -->
        <div id="technical" class="tab-content">
            <h2>Техническое задание</h2>
            <div class="technical-content">
                <?php if (isset($_SESSION['is_editor'])): ?>
                    <form method="POST">
                        <textarea name="technical" rows="10"><?= $technicalText ?></textarea><br>
                        <button type="submit">Сохранить</button>
                        <a href="?logout=1">Выйти из редактора</a>
                    </form>
                <?php else: ?>
                    <p><?= nl2br($technicalText) ?></p>
                <?php endif; ?>
            </div>
        </div>

        <!-- Вход редактора -->
        <div id="login-editor" class="tab-content">
            <h2>Вход для редактора</h2>
            <form method="POST">
                <input type="hidden" name="role" value="editor">
                <input type="password" name="password" placeholder="Пароль редактора" required>
                <button type="submit">Войти</button>
            </form>
        </div>

        <!-- Вход администратора -->
        <div id="login-admin" class="tab-content">
            <h2>Вход для администратора</h2>
            <form method="POST">
                <input type="hidden" name="role" value="admin">
                <input type="password" name="password" placeholder="Пароль администратора" required>
                <button type="submit">Войти</button>
            </form>
        </div>
    </div>

    <script src="js/script.js"></script>
</body>
</html>