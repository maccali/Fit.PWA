import { Fragment, useContext, useEffect } from 'react'
import Head from 'next/head'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { FaHeartbeat } from 'react-icons/fa'
import { parseCookies } from 'nookies'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/api'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Line } from '@ant-design/charts';

const navigation = ['Dashboard']
const profile = []

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [measurements, setMeasurements] = useState([])



  async function getMeasurements() {
    // if (props.measurements) {
    //   setMeasurements(props.measurements)
    // } else {
    const resMeasurements = await api.get(`/local/beat-measurement/${user?.sub}`)
    console.log("measerements", resMeasurements)
    setMeasurements(resMeasurements.data.Items)

    // }

  }
  useEffect(() => {
    console.log('user', user)
    if (user) {
      getMeasurements()
    }

    // api.get('/users');
  }, [user])

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item, itemIdx) =>
                        itemIdx === 0 ? (
                          <Fragment key={item}>
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                              {item}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item}
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {item}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">


                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user?.avatar_url}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {profile.map((item) => (
                                <Menu.Item key={item}>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                              <Menu.Item>
                                <a
                                  href="#"
                                  className='block px-4 py-2 text-sm text-gray-700'
                                >
                                  Sign out
                                </a>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <Fragment key={item}>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                        {item}
                      </a>
                    </Fragment>
                  ) : (
                    <a
                      key={item}
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.avatar_url}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">Nome</div>
                    <div className="text-sm font-medium leading-none text-gray-400">Email</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4">
            {measurements.map(item => {

              const splitMeasureTime = item.measureTime.split('T')
              const measureDate = splitMeasureTime[0]
              const splitMeasureDate = measureDate.split("-")
              const year = splitMeasureDate[0]
              const month = splitMeasureDate[1]
              const day = splitMeasureDate[2]
              const measureTime = splitMeasureTime[1]
              const time = measureTime.split(".")[0]


         

              // console.log("item.beatsPerMinute", item.beatsPerMinute)
              // console.log("labels", labels)
              // console.log("bpms", bpms)

              // var config = {
              //   data: [],
              //   padding: 'auto',
              //   xField: 'identifier',
              //   yField: 'bpm',
              //   xAxis: { tickCount: 5 },
              //   slider: {
              //     start: 0.1,
              //     end: 0.5,
              //   },
              // };

              // const data = {
              //   labels,
              //   datasets: [
              //     // {
              //     //   label: '# of Votes',
              //     //   data: [12, 19, 3, 5, 2, 3],
              //     //   fill: false,
              //     //   backgroundColor: 'rgb(255, 99, 132)',
              //     //   borderColor: 'rgba(255, 99, 132, 0.2)',
              //     //   yAxisID: 'y-axis-1',
              //     // },
              //     {
              //       // label: '# of No Votes',

              //       data: bpms,
              //       display: false,
              //       // fill: false,
              //       backgroundColor: 'rgb(0, 16, 87)',
              //       borderColor: 'rgb(31, 110, 0)',
              //       // yAxisID: 'y-axis-2',
              //     },
              //   ],
              // };

              // const options = {
              //   scales: {
              //     yAxes: [
              //       // {
              //       //   type: 'linear',
              //       //   display: true,
              //       //   position: 'left',
              //       //   id: 'y-axis-1',
              //       // },
              //       {
              //         // type: 'linear
              //         // display: true,
              //         // position: 'right',
              //         // id: 'y-axis-2',
              //         // gridLines: {
              //         //   drawOnArea: false,
              //         // },
              //       },
              //     ],
              //   },
              // };

              return <div key={item.id} className="container mx-auto px-4">
                <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
                  <div className="flex justify-center md:justify-end -mt-16">
                    <FaHeartbeat className="text-indigo-500" size='40px' />
                    {/* <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" /> */}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h2>Id</h2>
                        <h2 className="text-gray-800 text-1x9 font-semibold">{item.id.split('-')[0]}</h2>
                      </div>

                    </div>
                    <div>
                      <h2>Número de Batimentos</h2>
                      <h3 className="text-gray-800 text-1x9 font-semibold">{item.measurements.length}</h3>
                    </div>
                    <div>

                      <div>
                        <h2>Data</h2>
                        <div className="text-gray-800 text-1x9 font-semibold">
                          <span>{day}</span>
                          /<span>{month}</span> - <span>{year}</span> - <span>{time}</span>
                        </div>

                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h2>Tempo de Medição</h2>
                        <h3 className="text-gray-800 text-1x9 font-semibold">{item.measurementTimeMinutes} min</h3>
                      </div>
                      <div>
                        <h2>BPM</h2>
                        <h3 className="text-gray-800 text-1x9 font-semibold">{item.bpm}</h3>
                      </div>
                    </div>
                    <div>
                      {/* <Line data={data} options={options} /> */}
                      {/* <Line {...config} />; */}
                    </div>
                    {/* <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!</p> */}
                  </div>
                  {/*                                     <div className="flex justify-end mt-4">
                                        <a href="#" className="text-xl font-medium text-indigo-500">John Doe</a>
                                    </div> */}
                </div>
              </div>
            })}
            {/* <div className="container mx-auto px-4">
                            gwregrfd
                        </div>
                        <div className="container mx-auto px-4">
                            frwetgdfgs
                        </div> */}
          </div>
        </div>
      </main>
    </div>
  )
}

