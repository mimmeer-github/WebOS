// window.js - Core UIWindow logic for WebOS

class UIWindow {
  constructor(title = 'New Window', width = 300, height = 200) {
    this.window = document.createElement('div');
    this.window.className = 'window';
    this.window.style.width = `${width}px`;
    this.window.style.height = `${height}px`;
    this.window.style.position = 'absolute';
    this.window.style.left = '100px';
    this.window.style.top = '100px';
    this.window.style.zIndex = 1000;

    this.titleBar = document.createElement('div');
    this.titleBar.className = 'title-bar';
    this.titleBar.innerText = title;
    this.titleBar.style.cursor = 'move';
    this.titleBar.style.background = '#0078d4';
    this.titleBar.style.color = '#fff';
    this.titleBar.style.padding = '5px';
    this.titleBar.style.userSelect = 'none';

    this.content = document.createElement('div');
    this.content.className = 'window-content';
    this.content.innerHTML = '<p>Window content here</p>';
    this.content.style.padding = '10px';

    this.window.appendChild(this.titleBar);
    this.window.appendChild(this.content);
    document.body.appendChild(this.window);

    this.initDrag();
    this.initResize();
  }

  initDrag() {
    let isDragging = false;
    let offsetX, offsetY;

    this.titleBar.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - this.window.offsetLeft;
      offsetY = e.clientY - this.window.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        this.window.style.left = `${e.clientX - offsetX}px`;
        this.window.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }

  initResize() {
    const resizer = document.createElement('div');
    resizer.className = 'resizer';
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.background = '#888';
    resizer.style.position = 'absolute';
    resizer.style.right = '0';
    resizer.style.bottom = '0';
    resizer.style.cursor = 'nwse-resize';

    this.window.appendChild(resizer);

    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(this.window).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(this.window).height, 10);
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (isResizing) {
        this.window.style.width = `${startWidth + e.clientX - startX}px`;
        this.window.style.height = `${startHeight + e.clientY - startY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isResizing = false;
    });
  }
}

// Example usage
window.addEventListener('DOMContentLoaded', () => {
  new UIWindow('Demo Window');
});
