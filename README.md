# Pet Care Dashboard Frontend

A modern, responsive web application for tracking pet care activities including bathroom habits, feeding schedules, and pet profiles.

Link to backend project [backend_capstone](https://github.com/ntguru5/backend_capstone).

## Features

- 📊 Interactive Dashboard
  - Real-time activity tracking
  - Visual data representation with charts
  - Weekly statistics and trends

- 🐕 Pet Profiles
  - Manage multiple pet profiles
  - Track basic information (name, breed, age, weight)
  - Upload/link pet photos

- 📝 Activity Logging
  - Bathroom activity tracking
  - Feeding schedule management

- 📈 Data Visualization
  - Line graphs for frequency tracking
  - Pie charts for distribution analysis
  - Summary statistics

## Tech Stack

- **React** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Chart.js** - Data Visualization
- **Axios** - API Client
- **Lucide React** - Icons
- **React Router** - Navigation

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── BathroomLogModal.jsx
│   ├── DogModal.jsx
│   ├── FeedingLogModal.jsx
│   ├── LineGraph.jsx
│   ├── Navigation.jsx
│   └── PieChart.jsx
├── pages/              # Page components
│   ├── API.jsx         # External API
│   ├── APITesting.jsx  # API testing
│   ├── Home.jsx        # Dashboard
│   ├── Logs.jsx        # Activity logs
│   └── Profile.jsx     # Pet profiles
├── api/                # API integration
│   └── axios.js        # Axios configuration
├── App.jsx             # Root component
└── main.jsx            # Entry point
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Component Usage

### Dashboard Charts

```jsx
import LineGraph from '../components/LineGraph';
import PieChart from '../components/PieChart';

// Line Graph
<LineGraph
  title="Activity Frequency"
  data={[1, 2, 3, 4, 5]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
/>

// Pie Chart
<PieChart
  data={[30, 40, 30]}
  labels={['Category A', 'Category B', 'Category C']}
/>
```

### Activity Modals

```jsx
import BathroomLogModal from '../components/BathroomLogModal';
import FeedingLogModal from '../components/FeedingLogModal';

// Bathroom Log
<BathroomLogModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleSubmit}
/>

// Feeding Log
<FeedingLogModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleSubmit}
/>
```

## API Integration

The frontend communicates with the backend API using Axios. All API calls are centralized in the `src/api/axios.js` file.

Example API call:
```javascript
import axios from '../api/axios';

// Fetch data
const response = await axios.get('/bathroom-logs/stats');

// Post data
await axios.post('/feeding', {
  foodType: 'dry',
  amount: 1,
  mealTime: 'breakfast'
});
```

## Styling

The project uses Tailwind CSS for styling. Custom styles can be added in the `src/index.css` file.

Common utility classes:
- Layout: `flex`, `grid`, `p-4`, `m-4`
- Colors: `bg-indigo-600`, `text-gray-800`
- Typography: `text-2xl`, `font-bold`
- Effects: `shadow-md`, `rounded-lg`

## Future Enhancements

- Integrate authentication.
- Complete Axios centralization.
- Create option to select pet profile on home page if you have multiple pets.
- Create a chart on Home page to calculate what time of day is most active for bathroom activity.
