import React, { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useTimer } from 'reactjs-countdown-hook';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { AwesomeButton } from 'react-awesome-button';
import Head from 'next/head';
import LoadingScreen from '../components/LoadingScreen';
const PomodoroTimer = () => {
  const [mode, setMode] = useState('work');
  async function handleTimerFinish() {
    await setMode(mode === 'work' ? 'rest' : 'work');
  }
  const [workTime, setWorkTime] = useState(1500);
  const [restTime, setRestTime] = useState(300);
  const [modal, setModal] = useState(false);
  const [barColor, setBarColor] = useState('sky');
  const choseTime = mode == 'work' ? workTime : restTime;
  const { isActive, counter, seconds, pause, resume, reset } = useTimer(
    choseTime,
    handleTimerFinish
  );
  const mainPercentage =
    mode === 'work' ? (counter / workTime) * 100 : (counter / restTime) * 100;
  useEffect(() => {
    reset();
    pause();
  }, [mode]);
  useEffect(() => {
    if (counter / 60 <= 5) {
      setBarColor('red');
    } else {
      setBarColor('#0EA5E9');
    }
  }, [counter]);

  return (
    <div className="flex  h-[calc(100vh-5rem)] w-full  items-center justify-center p-10 ">
      <LoadingScreen />
      <Head>
        <title>
          {Math.floor(counter / 60)}:{seconds}
        </title>
      </Head>{' '}
      <div className="absolute top-28 right-20">
        <AwesomeButton
          type="secondary"
          size={'medium'}
          ripple={true}
          action={(elem) => {
            if (mode === 'rest') {
              setMode('work');
            } else {
              setMode('rest');
            }
          }}
        >
          {mode === 'rest' ? 'Fasiləni Keç' : 'Dərs Vaxtı'}
        </AwesomeButton>
      </div>
      <div className="absolute top-28 left-20">
        <AwesomeButton
          type="secondary"
          size={modal ? 'large' : 'medium'}
          ripple={true}
          action={() => {
            setModal(!modal);
          }}
        >
          {modal ? 'Ayarları Qapadın' : 'Ayarlar'}
        </AwesomeButton>
      </div>
      <div
        className={`glassorism     h-[30rem] w-1/3 flex-col  items-center  rounded bg-red-500 p-6 transition-all duration-500 ${
          modal
            ? ' relative flex translate-x-0 opacity-100'
            : ' invisible  absolute left-0  -translate-x-[30rem]   opacity-0'
        }`}
      >
        <h1 className="text-3xl font-semibold underline decoration-sky-500 underline-offset-2">
          Ayarlar
        </h1>
        <div className="mt-10 ">
          <h1 className="mb-4 text-xl ">İş üçün olan müddət</h1>
          <label className=" flex w-full items-center justify-center gap-x-12 ">
            <AwesomeButton
              type="primary"
              size={'medium'}
              ripple={true}
              action={() => {
                setWorkTime(workTime + 300);
              }}
            >
              +
            </AwesomeButton>
            <input
              type={'text'}
              value={workTime / 60}
              onChange={() => {}}
              className="pointer-events-none flex h-12 w-12 appearance-none items-center justify-center rounded border border-gray-400 text-center font-semibold outline-none"
            />
            <AwesomeButton
              type="secondary"
              size={'medium'}
              ripple={true}
              action={() => {
                if (workTime <= 0) {
                  setWorkTime(1500);
                } else {
                  setWorkTime(workTime - 300);
                }
              }}
            >
              -
            </AwesomeButton>
          </label>
        </div>
        <div className="mt-10 ">
          <h1 className="mb-4 text-xl ">Fasilə üçün olan müddət</h1>
          <label className=" flex w-full items-center justify-center gap-x-12 ">
            <AwesomeButton
              type="primary"
              size={'medium'}
              ripple={true}
              action={() => {
                setRestTime(restTime + 300);
              }}
            >
              +
            </AwesomeButton>
            <input
              type={'text'}
              value={restTime / 60}
              className="pointer-events-none flex h-12 w-12 appearance-none items-center justify-center rounded border border-gray-400 text-center font-semibold outline-none"
            />
            <AwesomeButton
              type="secondary"
              size={'medium'}
              ripple={true}
              action={() => {
                if (restTime <= 0) {
                  setRestTime(300);
                } else {
                  setRestTime(restTime - 300);
                }
              }}
            >
              -
            </AwesomeButton>
          </label>
          <div className="mx- mt-10 flex justify-center  ">
            <AwesomeButton
              type="primary"
              size={'medium'}
              ripple={true}
              action={() => {
                reset();
                pause();
              }}
            >
              Sıfırla
            </AwesomeButton>
          </div>
        </div>
      </div>
      <div className="flex h-[35rem] w-[40rem] flex-col items-center   ">
        <div className="h-[30rem]  w-[30rem] transition-all duration-500">
          <CircularProgressbar
            value={Math.floor(mainPercentage)}
            text={`${Math.floor(counter / 60)} : ${seconds}`}
            strokeWidth={5}
            styles={buildStyles({
              rotation: 0,

              strokeLinecap: 'round',

              textSize: '18px',

              pathTransitionDuration: 0.5,

              pathColor: `${barColor}`,
              textColor: '#666',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
        </div>
        <div className="mt-10 flex items-center gap-x-10  text-6xl">
          <AiOutlinePlayCircle
            className={`text-[] cursor-pointer text-sky-500 transition-all ${
              isActive ? 'text-gray-400' : null
            }`}
            onClick={() => resume()}
          />
          <AiOutlinePauseCircle
            className={`text-[] cursor-pointer text-sky-500 transition-all ${
              !isActive ? 'text-gray-400' : null
            }`}
            onClick={() => {
              pause();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
