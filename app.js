const state = {
    activePage: 'home',
    language: 'en', // 'en' or 'hi'
    backendUrl: 'http://localhost:8000'
};

const pages = {
    home: {
        title: "Smart Farming Overview",
        subtitle: "Monitoring your fields in real-time",
        render: () => `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Stats Cards -->
                <div class="glass p-6 rounded-3xl card-hover transition-all">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-blue-500/20 rounded-2xl"><i data-lucide="droplets" class="text-blue-400"></i></div>
                        <span class="text-xs text-green-400">+12% vs last week</span>
                    </div>
                    <p class="text-gray-400 text-sm">Soil Moisture</p>
                    <h3 class="text-3xl font-bold mt-1">45%</h3>
                    <div class="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 w-[45%]"></div>
                    </div>
                </div>

                <div class="glass p-6 rounded-3xl card-hover transition-all">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-green-500/20 rounded-2xl"><i data-lucide="thermometer" class="text-green-400"></i></div>
                        <span class="text-xs text-yellow-400">Optimal</span>
                    </div>
                    <p class="text-gray-400 text-sm">Temperature</p>
                    <h3 class="text-3xl font-bold mt-1">28°C</h3>
                    <div class="mt-4 flex gap-1">
                        <div class="h-4 w-1 bg-green-500 rounded-full"></div>
                        <div class="h-6 w-1 bg-green-500 rounded-full"></div>
                        <div class="h-8 w-1 bg-green-500 rounded-full"></div>
                        <div class="h-5 w-1 bg-white/20 rounded-full"></div>
                    </div>
                </div>

                <div class="glass p-6 rounded-3xl card-hover transition-all">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-yellow-500/20 rounded-2xl"><i data-lucide="zap" class="text-yellow-400"></i></div>
                        <span class="text-xs text-red-400">Low Energy</span>
                    </div>
                    <p class="text-gray-400 text-sm">IoT Sensors</p>
                    <h3 class="text-3xl font-bold mt-1">12 / 14</h3>
                    <p class="text-xs text-gray-500 mt-2">2 sensors need maintenance</p>
                </div>

                <!-- Main Chart -->
                <div class="md:col-span-2 glass p-8 rounded-3xl">
                    <h4 class="font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="trending-up" class="text-green-400 w-5 h-5"></i>
                        Yield Prediction Analytics
                    </h4>
                    <canvas id="yieldChart" class="w-full h-64"></canvas>
                </div>

                <!-- Quick Actions -->
                <div class="glass p-6 rounded-3xl">
                    <h4 class="font-bold mb-4">Quick Actions</h4>
                    <div class="flex flex-col gap-3">
                        <button class="w-full p-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-2xl text-left flex items-center gap-3 transition-all">
                            <i data-lucide="play-circle" class="w-5 h-5"></i> Start Drip Irrigation
                        </button>
                        <button class="w-full p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-2xl text-left flex items-center gap-3 transition-all">
                            <i data-lucide="camera" class="w-5 h-5"></i> Scan Crop Health
                        </button>
                        <button class="w-full p-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-2xl text-left flex items-center gap-3 transition-all">
                            <i data-lucide="download" class="w-5 h-5"></i> Export Monthly Report
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    assistant: {
        title: "AI Farmer Assistant",
        subtitle: "Ask anything about farming in English or Hindi",
        render: () => `
            <div class="max-w-4xl mx-auto glass p-8 rounded-3xl h-[70vh] flex flex-col">
                <div id="chat-messages" class="flex-1 overflow-y-auto mb-6 flex flex-col gap-4 pr-2">
                    <div class="flex gap-4">
                        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                            <i data-lucide="bot" class="text-white w-6 h-6"></i>
                        </div>
                        <div class="glass p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                            <p class="text-sm">Namaste! I am your AI Agriculture Assistant. How can I help you today?</p>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <input type="text" id="chat-input" placeholder="Type your question here..." class="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-green-500/50 pr-24 transition-all">
                    <div class="absolute right-2 top-2 flex gap-2">
                         <button class="p-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30">
                            <i data-lucide="mic" class="w-5 h-5"></i>
                        </button>
                        <button onclick="sendMessage()" class="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all">
                            <i data-lucide="send" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    irrigation: {
        title: "Smart Irrigation Dashboard",
        subtitle: "Autonomous water management and moisture tracking",
        render: () => `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="glass p-8 rounded-3xl">
                    <h4 class="text-xl font-bold mb-6">Live Field Data</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-6 bg-white/5 rounded-2xl text-center">
                            <p class="text-gray-400 text-sm">Humidity</p>
                            <h5 class="text-2xl font-bold mt-1 text-blue-400">62%</h5>
                        </div>
                        <div class="p-6 bg-white/5 rounded-2xl text-center">
                            <p class="text-gray-400 text-sm">Water Flow</p>
                            <h5 class="text-2xl font-bold mt-1 text-green-400">12L/min</h5>
                        </div>
                        <div class="p-6 bg-white/5 rounded-2xl text-center">
                            <p class="text-gray-400 text-sm">Next Cycle</p>
                            <h5 class="text-2xl font-bold mt-1 text-purple-400">6:00 PM</h5>
                        </div>
                        <div class="p-6 bg-white/5 rounded-2xl text-center">
                            <p class="text-gray-400 text-sm">Total Saved</p>
                            <h5 class="text-2xl font-bold mt-1 text-yellow-400">420L</h5>
                        </div>
                    </div>
                </div>
                <div class="glass p-8 rounded-3xl">
                     <h4 class="text-xl font-bold mb-6">Irrigation Controls</h4>
                     <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl mb-4">
                        <div class="flex items-center gap-4">
                             <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center"><i data-lucide="power" class="text-green-500"></i></div>
                             <div>
                                <p class="font-bold">Main Pump</p>
                                <p class="text-xs text-green-400">Running smoothly</p>
                             </div>
                        </div>
                        <div class="w-14 h-8 bg-green-500 rounded-full p-1 cursor-pointer">
                            <div class="w-6 h-6 bg-white rounded-full ml-auto"></div>
                        </div>
                     </div>
                     <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl mb-4">
                        <div class="flex items-center gap-4">
                             <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center"><i data-lucide="settings-2" class="text-blue-500"></i></div>
                             <div>
                                <p class="font-bold">Auto-Mode</p>
                                <p class="text-xs text-blue-400">AI Optimization Active</p>
                             </div>
                        </div>
                        <div class="w-14 h-8 bg-blue-500 rounded-full p-1 cursor-pointer">
                            <div class="w-6 h-6 bg-white rounded-full ml-auto"></div>
                        </div>
                     </div>
                </div>
            </div>
        `
    },
    disease: {
        title: "Crop Disease Detection",
        subtitle: "Instant AI diagnosis and organic treatment solutions",
        render: () => `
            <div class="max-w-2xl mx-auto glass p-10 rounded-3xl text-center">
                <div class="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="upload-cloud" class="w-12 h-12 text-green-400"></i>
                </div>
                <h4 class="text-2xl font-bold mb-2">Upload Crop Image</h4>
                <p class="text-gray-400 mb-8">Take a clear photo of the affected leaf or fruit for analysis</p>
                <div class="border-2 border-dashed border-white/10 rounded-3xl p-12 hover:border-green-500/50 cursor-pointer transition-all">
                    <input type="file" id="leaf-upload" class="hidden">
                    <label for="leaf-upload" class="cursor-pointer">
                        <p class="text-sm font-semibold text-green-400">Drop files here or click to browse</p>
                        <p class="text-xs text-gray-500 mt-2">Supports JPG, PNG (Max 5MB)</p>
                    </label>
                </div>
                <button onclick="detectDisease()" class="mt-8 px-10 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all">Analyze Health</button>
            </div>
        `
    },
    weather: {
        title: "Weather & Market Intelligence",
        subtitle: "Local forecasts and real-time Mandi crop prices",
        render: () => `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 glass p-8 rounded-3xl">
                    <h4 class="text-xl font-bold mb-6">7-Day Forecast</h4>
                    <div class="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-blue-500/20 to-transparent rounded-2xl">
                        <div class="flex items-center gap-6">
                            <i data-lucide="sun" class="w-16 h-16 text-yellow-400"></i>
                            <div>
                                <p class="text-4xl font-bold">32°C</p>
                                <p class="text-gray-400">Sunny • High of 34°</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-lg">Amritsar, Punjab</p>
                            <p class="text-xs text-green-400">Perfect for Harvesting</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-7 gap-2">
                        ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
                            <div class="p-4 bg-white/5 rounded-2xl text-center">
                                <p class="text-xs text-gray-400 mb-2">${day}</p>
                                <i data-lucide="${day === 'Tue' ? 'cloud-rain' : 'sun'}" class="w-6 h-6 mx-auto mb-2 ${day === 'Tue' ? 'text-blue-400' : 'text-yellow-400'}"></i>
                                <p class="text-sm font-bold">${day === 'Tue' ? '28°' : '31°'}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="glass p-8 rounded-3xl">
                    <h4 class="text-xl font-bold mb-6">Mandi Prices</h4>
                    <div id="mandi-list" class="flex flex-col gap-4">
                        <div class="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                            <div>
                                <p class="font-bold">Wheat</p>
                                <p class="text-xs text-gray-400">Per Quintal</p>
                            </div>
                            <div class="text-right">
                                <p class="text-green-400 font-bold">₹2,200</p>
                                <p class="text-[10px] text-green-500">↑ 2.4%</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                            <div>
                                <p class="font-bold">Basmati Rice</p>
                                <p class="text-xs text-gray-400">Per Quintal</p>
                            </div>
                            <div class="text-right">
                                <p class="text-blue-400 font-bold">₹4,500</p>
                                <p class="text-[10px] text-gray-400">Stable</p>
                            </div>
                        </div>
                         <div class="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                            <div>
                                <p class="font-bold">Cotton</p>
                                <p class="text-xs text-gray-400">Per Quintal</p>
                            </div>
                            <div class="text-right">
                                <p class="text-red-400 font-bold">₹6,100</p>
                                <p class="text-[10px] text-red-500">↓ 1.2%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    schemes: {
        title: "Government Schemes",
        subtitle: "Latest subsidies and financial support for farmers",
        render: () => `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="glass p-8 rounded-3xl border-l-4 border-green-500">
                    <h5 class="text-xl font-bold mb-2">PM-Kisan Samman Nidhi</h5>
                    <p class="text-sm text-gray-400 mb-6">Income support of ₹6,000 per year in three equal installments to all landholding farmer families.</p>
                    <div class="flex justify-between items-center">
                        <span class="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Financial Support</span>
                        <button class="text-sm font-bold text-blue-400 hover:underline">Apply Now →</button>
                    </div>
                </div>
                <div class="glass p-8 rounded-3xl border-l-4 border-blue-500">
                    <h5 class="text-xl font-bold mb-2">Pradhan Mantri Fasal Bima Yojana</h5>
                    <p class="text-sm text-gray-400 mb-6">Crop insurance scheme for farmers against crop failure due to natural calamities, pests or diseases.</p>
                    <div class="flex justify-between items-center">
                        <span class="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Insurance</span>
                        <button class="text-sm font-bold text-blue-400 hover:underline">View Details →</button>
                    </div>
                </div>
                <div class="glass p-8 rounded-3xl border-l-4 border-purple-500">
                    <h5 class="text-xl font-bold mb-2">PM Krishi Sinchai Yojana</h5>
                    <p class="text-sm text-gray-400 mb-6">Focuses on creating sources for assured irrigation and protective irrigation by harnessing rain water at micro level.</p>
                    <div class="flex justify-between items-center">
                        <span class="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">Irrigation Support</span>
                        <button class="text-sm font-bold text-blue-400 hover:underline">Check Eligibility →</button>
                    </div>
                </div>
            </div>
        `
    }
};

function navigate(pageId) {
    state.activePage = pageId;
    
    // Update Sidebar
    document.querySelectorAll('.sidebar-item').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.page === pageId) el.classList.add('active');
    });

    // Update Content
    const page = pages[pageId];
    if (page) {
        document.getElementById('page-title').innerText = page.title;
        document.getElementById('page-subtitle').innerText = page.subtitle;
        document.getElementById('content-area').innerHTML = page.render();
        lucide.createIcons();
        
        if (pageId === 'home') initChart();
    }
}

function initChart() {
    const ctx = document.getElementById('yieldChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: [{
                label: 'Projected Yield (Tons)',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: '#4ade80',
                backgroundColor: 'rgba(74, 222, 128, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage('user', msg);
    input.value = '';

    try {
        const res = await fetch(`${state.backendUrl}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, language: state.language })
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        appendMessage('bot', data.response);
    } catch (e) {
        // Mock fallback for demo
        setTimeout(() => {
            let response = "I'm currently in demo mode. For real-time AI guidance, please ensure the FastAPI backend is running with a valid Gemini API Key.";
            if (msg.toLowerCase().includes("crop")) response = "Based on your soil moisture (45%), the best crop for this season would be Wheat or Mustard. Wheat requires moderate water and cooler temperatures.";
            if (msg.toLowerCase().includes("yellow")) response = "Yellowing leaves typically indicate a Nitrogen deficiency. I recommend applying an organic fertilizer or urea in small quantities.";
            if (msg.toLowerCase().includes("water")) response = "Wheat needs approximately 450-650mm of water throughout its cycle. Since your moisture is at 45%, no immediate irrigation is required.";
            appendMessage('bot', response);
        }, 1000);
    }
}

function appendMessage(sender, text) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `flex gap-4 ${sender === 'user' ? 'flex-row-reverse' : ''}`;
    div.innerHTML = `
        <div class="w-10 h-10 ${sender === 'user' ? 'bg-blue-500' : 'bg-green-500'} rounded-full flex items-center justify-center shrink-0">
            <i data-lucide="${sender === 'user' ? 'user' : 'bot'}" class="text-white w-6 h-6"></i>
        </div>
        <div class="glass p-4 rounded-2xl ${sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[80%]">
            <p class="text-sm">${text}</p>
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    lucide.createIcons();
}

// Initial Navigation
navigate('home');
