# A Digital Double of Me In An Environment Map ! 😎

#### This project was a fun deep dive into **Three.js**, where I brought a **digital double** of myself to life! Using a 3D Scan I turned myself into a GLB model animated with **Mixamo rigs**. I then placed my clone into an HDR environment to create a visually immersive experience with dynamic lighting and shadows.

---

## 🌟 Key Highlights  

### 🎥 Animated Digital Double  
I loaded and animated a GLB file of myself using Mixamo. The animations are controlled with `AnimationMixer`, and I even tweaked the playback speed for a more natural feel.

### 🌌 HDR Environment  
The scene uses `RGBELoader` to load an HDR environment map, paired with `GroundedSkybox` for realistic reflections and lighting that ties the whole scene together.

### 🔍 Interactive Camera  
Adding **OrbitControls** gave the scene smooth and intuitive camera navigation, allowing viewers to fully explore the digital double and its environment.

### 🚀 Focused on Efficiency  
Instead of building everything from scratch, I leaned into the built-in tools in Three.js to save time while keeping the setup clean and flexible for future tweaks.

### 💡 Some Cool Technologies I Used  
- **Three.js** for the entire 3D scene.  
- **GLTFLoader** for loading my model with animations.  
- **RGBELoader** and **GroundedSkybox** for the environment and reflections.  
- **OrbitControls** for making the camera feel smooth and interactive.  

---

## 🚀 Setup  

Download [Node.js](https://nodejs.org/en/download/) if you don’t already have it, and follow these steps to check it out:  

```bash
# Clone the repository  
git clone <repository-url>  

# Navigate to the project directory  
cd <project-folder>  

# Install dependencies and start the dev server  
npm install && npm run dev  
