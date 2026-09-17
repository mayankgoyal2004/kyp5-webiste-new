import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { extractListData, resolveImageUrl } from "../utils/dataHelper";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getEvents();
        const list = extractListData(res);
        if (list && list.length > 0) {
          setEvents(list);
        } else {
          setEvents([
            {
              id: "1",
              title: "National Career Orientation Webinar 2026",
              description: "Live Q&A with top psychologists on choosing Class 11 stream based on aptitude vs marks.",
              eventDate: new Date(Date.now() + 86400000 * 5).toISOString(),
              eventTime: "04:00 PM - 05:30 PM",
              venue: "Online Zoom Live",
              thumbnail: "/assets/images/events/01.jpg",
            },
            {
              id: "2",
              title: "School Principals & Counselors Round Table",
              description: "Institutional strategy meet on integrating psychometric evaluation into NEP 2020 frameworks.",
              eventDate: new Date(Date.now() + 86400000 * 12).toISOString(),
              eventTime: "10:30 AM - 01:00 PM",
              venue: "India Habitat Centre, New Delhi",
              thumbnail: "/assets/images/events/02.jpg",
            },
          ]);
        }
      } catch (err) {
        console.warn("Using sample events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Live Sessions & Workshops"
        title="Upcoming Guidance Events & Webinars"
        subtitle="Participate in live interactive seminars hosted by clinical psychologists, academic directors, and career thought leaders."
      />

      {loading ? (
        <div className="min-h-[250px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, idx) => {
            const fallbackImg = `/assets/images/events/0${(idx % 2) + 1}.jpg`;
            const imgSrc = resolveImageUrl(event.thumbnail || event.image, fallbackImg);

            return (
              <div
                key={event.id || idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
              >
                <div className="md:w-5/12 h-56 md:h-auto bg-slate-100 relative overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = fallbackImg;
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-[11px] font-extrabold text-[#1b93ad] shadow-xs">
                    Live Workshop
                  </div>
                </div>

                <div className="md:w-7/12 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1 text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-2 text-[#1b93ad] font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(event.eventDate || Date.now()).toLocaleDateString("en-IN", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.eventTime || "04:00 PM IST"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.venue || "Online Live Session"}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0f172a] group-hover:text-[#1b93ad] transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {event.description || "Join our upcoming live webinar with certified psychologists."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/upcoming-events/${event.id}`}
                      className="inline-flex items-center gap-1.5 bg-[#2995ac] hover:bg-[#207f94] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors"
                    >
                      <span>{event.buttonText || "Event Details"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
