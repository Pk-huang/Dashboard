// setup.js
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// 定義資料夾與檔案結構
const structure = {
  'cards': ['weatherCard.js', 'quoteCard.js', 'currencyCard.js', 'todoCard.js', 'horoscopeCard.js'],
  'utils': ['storage.js', 'api.js'],
  '.': ['app.js', 'drag.js']
};

// 基本模組內容範本
const moduleTemplate = (filename) => `// ${filename}

export function ${filename.replace('.js', '')}() {
  console.log('${filename.replace('.js', '')} module loaded');
}
`;

const specialModules = {
  'app.js': `// app.js

import { weatherCard } from './cards/weatherCard.js';
import { quoteCard } from './cards/quoteCard.js';
import { currencyCard } from './cards/currencyCard.js';
import { todoCard } from './cards/todoCard.js';
import { horoscopeCard } from './cards/horoscopeCard.js';
import { enableDragAndDrop } from './drag.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Dashboard App Starting...');
  
  weatherCard();
  quoteCard();
  currencyCard();
  todoCard();
  horoscopeCard();
  
  enableDragAndDrop();
});
`,
  'drag.js': `// drag.js

export function enableDragAndDrop() {
  console.log('Drag and Drop Enabled');
}
`
};

// 建立資料夾與檔案
for (const [folder, files] of Object.entries(structure)) {
  if (folder !== '.') {
    mkdirSync(folder, { recursive: true });
  }
  
  for (const file of files) {
    const filePath = join(folder, file);

    if (existsSync(filePath)) {
      console.log(`Skipped (already exists): ${filePath}`);
      continue;
    }

    let content = '';

    if (specialModules[file]) {
      content = specialModules[file];
    } else {
      content = moduleTemplate(file);
    }

    writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  }
}

// 建立 README.md
const readmeContent = `# 📊 Personal Dashboard Project

This is a pure JavaScript personal dashboard application.

## 🏗️ Structure
- **cards/**: Each dashboard widget module
- **utils/**: Common helper functions
- **app.js**: Project main controller
- **drag.js**: Drag and drop functionality
- **assets/**: (Optional) Images or icons

## 🛠️ Features
- Weather information
- Random motivational quote
- Currency exchange rates
- Personal To-Do list
- Horoscope ranking

## 📦 Setup
No backend needed.  
Just open \`index.html\` in your browser after development.

## 🚀 Future Improvements
- Save card order into localStorage
- Dark/Light mode toggle
- Responsive layout optimization
`;

const readmePath = join('.', 'README.md');
if (!existsSync(readmePath)) {
  writeFileSync(readmePath, readmeContent);
  console.log(`Created: ${readmePath}`);
} else {
  console.log('Skipped (README already exists)');
}
