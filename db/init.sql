DELETE FROM users;
DELETE FROM items;


CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category TEXT,
  material TEXT,
  color TEXT,
  image TEXT
);

-- ゲストユーザー追加
INSERT INTO users (firstName, lastName, email, password)
VALUES ('Guest', 'User', 'guest@example.com', 'dummy-password');

-- 商品データ追加（そのままコピペ）
INSERT INTO items (title, description, price, category, material, color, image) VALUES
('Curtain 1', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_1.jpg'),
('Curtain 2', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_2.jpg'),
('Curtain 3', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_3.jpg'),
('Curtain 4', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_4.jpg'),
('Curtain 5', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_5.jpg'),
('Curtain 6', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_6.jpg'),
('Curtain 7', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_7.jpg'),
('Curtain 8', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_8.jpg'),
('Curtain 9', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_9.jpg'),
('Curtain 10', 'Stylish and high-quality', 60, 'curtain', 'fabric', 'white', '/img/curtain_10.jpg'),
('Mirror 1', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_1.jpg'),
('Mirror 2', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_2.jpg'),
('Mirror 3', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_3.jpg'),
('Mirror 4', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_4.jpg'),
('Mirror 5', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_5.jpg'),
('Mirror 6', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_6.jpg'),
('Mirror 7', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_7.jpg'),
('Mirror 8', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_8.jpg'),
('Mirror 9', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_9.jpg'),
('Mirror 10', 'Stylish and high-quality', 60, 'mirror', 'fabric', 'white', '/img/mirror_10.jpg'),
('Plant 1', 'Stylish and high-quality', 60, 'plant', 'fabric', 'white', '/img/plant_1.jpg'),
('Plant 2', 'Stylish and high-quality', 60, 'plant', 'fabric', 'white', '/img/plant_2.jpg'),
('Plant 3', 'Stylish and high-quality', 60, 'plant', 'fabric', 'white', '/img/plant_3.jpg'),
('Rug 1', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_4.jpg'),
('Rug 2', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_5.jpg'),
('Rug 3', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_6.jpg'),
('Rug 4', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_7.jpg'),
('Rug 5', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_8.jpg'),
('Rug 6', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_9.jpg'),
('Rug 7', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_10.jpg'),
('Rug 8', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_1.jpg'),
('Rug 9', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_2.jpg'),
('Rug 10', 'Stylish and high-quality', 60, 'rug', 'fabric', 'white', '/img/rug_3.jpg'),
('Sofa 1', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_4.jpg'),
('Sofa 2', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_5.jpg'),
('Sofa 3', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_6.jpg'),
('Sofa 4', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_7.jpg'),
('Sofa 5', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_8.jpg'),
('Sofa 6', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_9.jpg'),
('Sofa 7', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_10.jpg'),
('Sofa 8', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_1.jpg'),
('Sofa 9', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_2.jpg'),
('Sofa 10', 'Stylish and high-quality', 60, 'sofa', 'fabric', 'white', '/img/sofa_3.jpg'),
('Table 1', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_4.jpg'),
('Table 2', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_5.jpg'),
('Table 3', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_6.jpg'),
('Table 4', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_7.jpg'),
('Table 5', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_8.jpg'),
('Table 6', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_9.jpg'),
('Table 7', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_10.jpg'),
('Table 8', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_1.jpg'),
('Table 9', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_2.jpg'),
('Table 10', 'Stylish and high-quality', 60, 'table', 'wood', 'white', '/img/table_3.jpg'),
('Tvstand 1', 'Stylish and high-quality', 60, 'tvstand', 'wood', 'black', '/img/tvstand_4.jpg'),
('Tvstand 2', 'Stylish and high-quality', 60, 'tvstand', 'wood', 'black', '/img/tvstand_5.jpg'),
('Tvstand 3', 'Stylish and high-quality', 60, 'tvstand', 'wood', 'black', '/img/tvstand_6.jpg'),
('Tvstand 4', 'Stylish and high-quality', 60, 'tvstand', 'wood', 'black', '/img/tvstand_7.jpg'),
('Tvstand 5', 'Stylish and high-quality', 60, 'tvstand', 'wood', 'black', '/img/tvstand_8.jpg'),
('Chair 1', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_9.jpg'),
('Chair 2', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_10.jpg'),
('Chair 3', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_1.jpg'),
('Chair 4', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_2.jpg'),
('Chair 5', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_3.jpg'),
('Chair 6', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_4.jpg'),
('Chair 7', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_5.jpg'),
('Chair 8', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_6.jpg'),
('Chair 9', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_7.jpg'),
('Chair 10', 'Stylish and high-quality', 60, 'chair', 'fabric', 'white', '/img/chair_8.jpg');