"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// needed for dayClick
import EditEventModal from "@/components/partials/app/calender/EditEventModal";
import EventModal from "@/components/partials/app/calender/EventModal";
import Button from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";
import Checkbox from "@/components/ui/Checkbox";

const CalenderPage = () => {
  const { calendarEvents, categories } = useSelector(
    (state: any) => state.calendar,
  );
  const [activeModal, setActiveModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const[state, setState] = useState({date: new Date()})

  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((c: any) => c.value),
  );

  const handleCategorySelection = (category: any) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const dispatch = useDispatch();
  const closeModal = () => {
    setActiveModal(false);
  };

  const onCloseEditModal = () => {
    setEditModal(false);
  };

  //   const calendarOptions = {
  //     plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  //     headerToolbar: {
  //       left: "prev,next today",
  //       center: "title",
  //       right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  //     },
  //     events: calendarEvents,
  //     editable: true,
  //     selectable: true,
  //     selectMirror: true,
  //     dayMaxEvents: true,
  //     weekends: true,
  //     dateClick: {},
  //     eventClick: {},
  //     eventsSet: {},
  //   };

  const handleDateClick = (arg: any) => {
    setActiveModal(true);
    setSelectedEvent(arg);
  };

  const handleEventClick = (arg: any) => {
    setEditModal(true);
    setEditItem(arg);
  };

  const handleClassName: any = (arg: any) => {
    if (arg.event.extendedProps.calendar === "holiday") {
      return "danger";
    } else if (arg.event.extendedProps.calendar === "business") {
      return "primary";
    } else if (arg.event.extendedProps.calendar === "personal") {
      return "success";
    } else if (arg.event.extendedProps.calendar === "family") {
      return "info";
    } else if (arg.event.extendedProps.calendar === "etc") {
      return "info";
    } else if (arg.event.extendedProps.calendar === "meeting") {
      return "warning";
    }
  };

  // filter events
  const filteredEvents = calendarEvents.filter((event: any) =>
    selectedCategories.includes(event.extendedProps.calendar),
  );

  return (
    <div className="dashcode-calender">
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
        Calender
      </h4>
      <div className="grid grid-cols-12 gap-4">
        <Card className="lg:col-span-3 col-span-12 bg-white">
          <Button
            icon="heroicons-outline:plus"
            className="btn-dark w-full block  "
            onClick={() => {
              setActiveModal(true);
            }}
          >
            Add Task
          </Button>
          <div className="block py-4 text-slate-800 dark:text-slate-400 font-semibold text-xs uppercase mt-4">
            FILTER
          </div>

          <ul className=" space-y-2 ">
            <li>
              <Checkbox
                activeClass="ring-primary-500 bg-primary-500"
                label="All"
                value={selectedCategories.length === categories.length}
                onChange={() => {
                  if (selectedCategories.length === categories.length) {
                    setSelectedCategories([]);
                  } else {
                    setSelectedCategories(categories.map((c: any) => c.value));
                  }
                }}
                id={undefined}
                disabled={undefined}
                name={undefined}
              />
            </li>
            {categories.map((category: any) => (
              <li key={category.value}>
                <Checkbox
                  id={undefined}
                  disabled={undefined}
                  name={undefined}
                  activeClass={category.activeClass}
                  label={category.label}
                  value={selectedCategories.includes(category.value)}
                  onChange={() => handleCategorySelection(category.value)}
                />
              </li>
            ))}
          </ul>
        </Card>
        <Card className="lg:col-span-9 col-span-12 bg-white">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={filteredEvents}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={2}
            weekends={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventClassNames={handleClassName}
            initialView="dayGridMonth"
          />
        </Card>
      </div>

      <EventModal
        activeModal={activeModal}
        onClose={closeModal}
        selectedEvent={selectedEvent}
      />
      <EditEventModal
        editModal={editModal}
        onCloseEditModal={onCloseEditModal}
        editItem={editItem}
      />
    </div>
  );
};

export default CalenderPage;
