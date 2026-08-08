import { useEffect, useState } from "react"
import Papa from "papaparse"

import {
  Users,
  DollarSign,
  CalendarDays,
  Clock3,
  Activity,
  Stethoscope,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

  return (
    <div className="dashboard">

      {/* HEADER */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-icon">
            <Activity size={21} />
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


      {/* FILTER BAR */}

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


      {/* KPI CARDS */}

      <section className="kpi-grid">

        <div className="kpi-card">

          <div className="kpi-top">
            <span>Total Patients</span>

            <div className="kpi-icon">
              <Users size={18} />
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
              <DollarSign size={18} />
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
              <CalendarDays size={18} />
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
              <Clock3 size={18} />
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


      {/* MAIN CONTENT */}

      <section className="main-grid">


        {/* PATIENT VOLUME */}

        <div className="panel large-panel">

          <div className="panel-header">

            <div>
              <h2>
                Patient Volume Trend
              </h2>

              <p>
                Monthly admission activity
              </p>
            </div>

            <div className="panel-icon">
              <TrendingUp size={18} />
            </div>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={monthlyData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1d3048"
                  vertical={false}
                />

                <XAxis
                  dataKey="Month"
                  stroke="#61748d"
                  tick={{
                    fill: "#71839d",
                    fontSize: 9,
                  }}
                  tickLine={false}
                  axisLine={false}
                  interval={5}
                />

                <YAxis
                  stroke="#61748d"
                  tick={{
                    fill: "#71839d",
                    fontSize: 9,
                  }}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                />

                <Tooltip
                  contentStyle={{
                    background: "#101d31",
                    border: "1px solid #29415f",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "11px",
                  }}
                  labelStyle={{
                    color: "#8fa4bd",
                    marginBottom: "4px",
                  }}
                  formatter={(value) => [
                    `${value.toLocaleString()} patients`,
                    "Admissions",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="Patients"
                  stroke="#4da3ff"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                    fill: "#0e1829",
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* ADMISSION TYPE */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>
                Admission Type
              </h2>

              <p>
                Patients by admission type
              </p>
            </div>

            <div className="panel-icon">
              <Stethoscope size={18} />
            </div>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={admissionData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1d3048"
                  vertical={false}
                />

                <XAxis
                  dataKey="Admission Type"
                  stroke="#61748d"
                  tick={{
                    fill: "#71839d",
                    fontSize: 9,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#61748d"
                  tick={{
                    fill: "#71839d",
                    fontSize: 9,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#101d31",
                    border: "1px solid #29415f",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "11px",
                  }}
                  formatter={(value) => [
                    `${value.toLocaleString()} patients`,
                    "Patients",
                  ]}
                />

                <Bar
                  dataKey="Patients"
                  fill="#4da3ff"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </section>


      {/* BOTTOM CONTENT */}

      <section className="bottom-grid">


        {/* CONDITION REVENUE */}

        <div className="panel">

  <div className="panel-header">

    <div>
      <h2>Condition Revenue</h2>
      <p>Billing by medical condition</p>
    </div>

  </div>

  <div className="mini-chart">

    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={conditionData}
        layout="vertical"
        margin={{
          top: 0,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1d3048"
          horizontal={false}
        />

        <XAxis
          type="number"
          tick={{
            fill: "#71839d",
            fontSize: 8,
          }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            `$${(value / 1000000).toFixed(0)}M`
          }
        />

        <YAxis
          type="category"
          dataKey="Medical Condition"
          width={72}
          tick={{
            fill: "#9aabc0",
            fontSize: 8,
          }}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          contentStyle={{
            background: "#101d31",
            border: "1px solid #29415f",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "10px",
          }}
          formatter={(value) => [
            `$${(value / 1000000).toFixed(2)}M`,
            "Billing",
          ]}
        />

        <Bar
          dataKey="Billing Amount"
          fill="#4da3ff"
          radius={[0, 5, 5, 0]}
          barSize={12}
        />

      </BarChart>
    </ResponsiveContainer>

  </div>

</div>


        {/* HOSPITAL REVENUE */}

        <div className="panel">

  <div className="panel-header">

    <div>
      <h2>Hospital Revenue</h2>
      <p>Top hospitals by billing</p>
    </div>

  </div>

  <div className="mini-chart">

    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={hospitalData}
        layout="vertical"
        margin={{
          top: 0,
          right: 10,
          left: 8,
          bottom: 0,
        }}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1d3048"
          horizontal={false}
        />

        <XAxis
          type="number"
          tick={{
            fill: "#71839d",
            fontSize: 8,
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
          width={75}
          tick={{
            fill: "#9aabc0",
            fontSize: 7,
          }}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          contentStyle={{
            background: "#101d31",
            border: "1px solid #29415f",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "10px",
          }}
          formatter={(value) => [
            `$${Number(value).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`,
            "Billing",
          ]}
        />

        <Bar
          dataKey="Billing Amount"
          fill="#4da3ff"
          radius={[0, 5, 5, 0]}
          barSize={7}
        />

      </BarChart>
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
      <ShieldCheck size={18} />
    </div>

  </div>


  <div className="insight-list">

    <div className="insight-item">

      <span>01</span>

      <p>
        <strong>Insurance Revenue Leader</strong>
        Cigna generated the highest billing at
        approximately $287.1M.
      </p>

    </div>


    <div className="insight-item">

      <span>02</span>

      <p>
        <strong>Hospital Revenue Leader</strong>
        Johnson PLC recorded the highest billing
        among top hospitals at $1.08M.
      </p>

    </div>


    <div className="insight-item">

      <span>03</span>

      <p>
        <strong>Test Results</strong>
        Abnormal results represent the largest
        test-result group with 18,627 patients.
      </p>

    </div>


    <div className="insight-item">

      <span>04</span>

      <p>
        <strong>Admission Pattern</strong>
        Elective admissions lead slightly with
        18,655 patients.
      </p>

    </div>

  </div>

</div>

</section>

</div>
)
}

export default App