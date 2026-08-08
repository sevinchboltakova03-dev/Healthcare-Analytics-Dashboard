import { useEffect, useState } from "react"
import Papa from "papaparse"

import {
  Users,
  DollarSign,
  CalendarDays,
  Clock3,
  Activity,
  TrendingUp,
  PieChart as PieIcon,
  Building2,
  ShieldCheck,
} from "lucide-react"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

import "./App.css"

function App() {
  const [kpis, setKpis] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [admissionData, setAdmissionData] = useState([])
  const [conditionData, setConditionData] = useState([])
  const [hospitalData, setHospitalData] = useState([])

  useEffect(() => {
    // KPI DATA
    Papa.parse("/data/kpi.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setKpis(results.data.filter((row) => row.Metric))
      },
    })

    // MONTHLY ADMISSIONS
    Papa.parse("/data/monthly_admissions.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setMonthlyData(
          results.data.filter((row) => row.Month)
        )
      },
    })

    // ADMISSION TYPE
    Papa.parse("/data/admission_distribution.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setAdmissionData(
          results.data.filter((row) => row["Admission Type"])
        )
      },
    })

    // CONDITION REVENUE
    Papa.parse("/data/condition_revenue.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setConditionData(
          results.data.filter((row) => row["Medical Condition"])
        )
      },
    })

    // HOSPITAL REVENUE
    Papa.parse("/data/top_hospitals_revenue.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setHospitalData(
          results.data.filter((row) => row.Hospital)
        )
      },
    })
  }, [])

  const getKpiValue = (metric) => {
    const item = kpis.find(
      (kpi) => kpi.Metric === metric
    )

    return item ? Number(item.Value) : 0
  }

  const totalPatients = getKpiValue("Total Patients")
  const totalBilling = getKpiValue("Total Billing")
  const averageAge = getKpiValue("Average Age")
  const averageStay = getKpiValue("Average Stay")

  const conditionColors = [
    "#4da3ff",
    "#5bc0be",
    "#7b8cff",
    "#8bd17c",
    "#f6bd60",
    "#ee7d78",
  ]

  const tooltipStyle = {
    background: "#101d31",
    border: "1px solid #29415f",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "10px",
  }

  return (
    <div className="dashboard">

      {/* ================= HEADER ================= */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-icon">
            <Activity size={20} />
          </div>

          <div>
            <h1>Healthcare Analytics</h1>
            <p>Executive Performance Dashboard</p>
          </div>

        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          <span>Live Data</span>
        </div>

      </header>


      {/* ================= FILTER BAR ================= */}

      <section className="filter-bar">

        <div className="filter-title">
          <span>Dashboard Overview</span>

          <small>
            Hospital performance & patient insights
          </small>
        </div>

        <div className="filter-group">

          <label>View</label>

          <select defaultValue="All Patients">
            <option>All Patients</option>
            <option>All Departments</option>
          </select>

        </div>

        <div className="filter-group">

          <label>Period</label>

          <select defaultValue="All Time">
            <option>All Time</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>

        </div>

      </section>


      {/* ================= KPI ================= */}

      <section className="kpi-grid">

        <div className="kpi-card">

          <div className="kpi-top">
            <span>Total Patients</span>

            <div className="kpi-icon">
              <Users size={16} />
            </div>
          </div>

          <strong>
            {totalPatients.toLocaleString()}
          </strong>

          <small>
            Patients recorded
          </small>

        </div>


        <div className="kpi-card">

          <div className="kpi-top">
            <span>Total Billing</span>

            <div className="kpi-icon">
              <DollarSign size={16} />
            </div>
          </div>

          <strong>
            ${(totalBilling / 1000000).toFixed(1)}M
          </strong>

          <small>
            Total healthcare billing
          </small>

        </div>


        <div className="kpi-card">

          <div className="kpi-top">
            <span>Average Age</span>

            <div className="kpi-icon">
              <CalendarDays size={16} />
            </div>
          </div>

          <strong>
            {averageAge.toFixed(1)}
          </strong>

          <small>
            Average patient age
          </small>

        </div>


        <div className="kpi-card">

          <div className="kpi-top">
            <span>Average Stay</span>

            <div className="kpi-icon">
              <Clock3 size={16} />
            </div>
          </div>

          <strong>
            {averageStay.toFixed(1)} days
          </strong>

          <small>
            Average hospital stay
          </small>

        </div>

      </section>


      {/* ================= TOP ROW ================= */}

      <section className="main-grid">


        {/* ADMISSION TREND */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Admission Trend</h2>

              <p>
                Monthly patient admissions
              </p>
            </div>

            <div className="panel-icon">
              <TrendingUp size={16} />
            </div>

          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart
                data={monthlyData}
                margin={{
                  top: 8,
                  right: 8,
                  left: -20,
                  bottom: 2,
                }}
              >

                <CartesianGrid
                  stroke="#1b2d43"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="Month"
                  tick={{
                    fill: "#71839d",
                    fontSize: 8,
                  }}
                  tickLine={false}
                  axisLine={false}
                  interval={5}
                />

                <YAxis
                  tick={{
                    fill: "#71839d",
                    fontSize: 8,
                  }}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [
                    `${Number(value).toLocaleString()} patients`,
                    "Admissions",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="Patients"
                  stroke="#4da3ff"
                  strokeWidth={2.4}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#4da3ff",
                    stroke: "#dceeff",
                    strokeWidth: 2,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* CONDITION REVENUE */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Condition Revenue</h2>

              <p>
                Billing distribution by condition
              </p>
            </div>

            <div className="panel-icon">
              <PieIcon size={16} />
            </div>

          </div>

          <div className="chart-container donut-layout">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={conditionData}
                  dataKey="Billing Amount"
                  nameKey="Medical Condition"
                  cx="42%"
                  cy="50%"
                  innerRadius="48%"
                  outerRadius="70%"
                  paddingAngle={3}
                  stroke="none"
                >

                  {conditionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        conditionColors[
                          index % conditionColors.length
                        ]
                      }
                    />
                  ))}

                </Pie>

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [
                    `$${(Number(value) / 1000000).toFixed(1)}M`,
                    "Billing",
                  ]}
                />

                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{
                    fontSize: "8px",
                    color: "#91a2b7",
                    lineHeight: "18px",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* HOSPITAL REVENUE */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Hospital Revenue</h2>

              <p>
                Top hospitals by billing
              </p>
            </div>

            <div className="panel-icon">
              <Building2 size={16} />
            </div>

          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={hospitalData}
                layout="vertical"
                margin={{
                  top: 0,
                  right: 8,
                  left: 4,
                  bottom: 0,
                }}
              >

                <CartesianGrid
                  stroke="#1b2d43"
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tick={{
                    fill: "#71839d",
                    fontSize: 7,
                  }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    `$${(value / 1000000).toFixed(1)}M`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="Hospital"
                  width={72}
                  tick={{
                    fill: "#8fa1b6",
                    fontSize: 7,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [
                    `$${Number(value).toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 0,
                      }
                    )}`,
                    "Billing",
                  ]}
                />

                <Bar
                  dataKey="Billing Amount"
                  fill="#5aa9ff"
                  radius={[0, 4, 4, 0]}
                  barSize={7}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM ROW ================= */}

      <section className="bottom-grid">


        {/* PATIENT VOLUME */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Patient Volume Trend</h2>

              <p>
                Long-term admission activity
              </p>
            </div>

            <div className="panel-icon">
              <Users size={16} />
            </div>

          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart
                data={monthlyData}
                margin={{
                  top: 8,
                  right: 8,
                  left: -20,
                  bottom: 2,
                }}
              >

                <defs>

                  <linearGradient
                    id="patientGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#4da3ff"
                      stopOpacity={0.30}
                    />

                    <stop
                      offset="100%"
                      stopColor="#4da3ff"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  stroke="#1b2d43"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="Month"
                  tick={{
                    fill: "#71839d",
                    fontSize: 8,
                  }}
                  tickLine={false}
                  axisLine={false}
                  interval={5}
                />

                <YAxis
                  tick={{
                    fill: "#71839d",
                    fontSize: 8,
                  }}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [
                    `${Number(value).toLocaleString()} patients`,
                    "Patients",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="Patients"
                  stroke="#4da3ff"
                  strokeWidth={2}
                  fill="url(#patientGradient)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "#4da3ff",
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* BUSINESS INSIGHTS */}

        <div className="panel insights-panel">

          <div className="panel-header">

            <div>
              <h2>Business Insights</h2>

              <p>
                Key findings from healthcare data
              </p>
            </div>

            <div className="panel-icon">
              <ShieldCheck size={16} />
            </div>

          </div>


          <div className="insight-list">

            <div className="insight-item">

              <span>01</span>

              <p>
                <strong>
                  Insurance Revenue Leader
                </strong>

                Cigna generated the highest billing
                at approximately $287.1M.
              </p>

            </div>


            <div className="insight-item">

              <span>02</span>

              <p>
                <strong>
                  Hospital Revenue Leader
                </strong>

                Johnson PLC recorded the highest
                billing among top hospitals at $1.08M.
              </p>

            </div>


            <div className="insight-item">

              <span>03</span>

              <p>
                <strong>
                  Test Results
                </strong>

                Abnormal results represent the largest
                test-result group with 18,627 patients.
              </p>

            </div>


            <div className="insight-item">

              <span>04</span>

              <p>
                <strong>
                  Admission Pattern
                </strong>

                Elective admissions lead slightly
                with 18,655 patients.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default App