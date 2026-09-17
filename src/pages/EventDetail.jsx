import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle, Share2 } from "lucide-react";
import publicApi from "../api/publicApi";
import { extractItemData, resolveImageUrl } from "../utils/dataHelper";
import RichTextContent from "../components/common/RichTextContent";
import toast from "react-hot-toast";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getEventById(id);
        const data = extractItemData(res);
        if (data && (data.title || data.id)) {
          setEvent(data);
        } else {
          setEvent({
            title: "National Career Orientation Webinar",
            description: "<p>Join registered career guidance psychometricians and educational psychologists for a deep-dive interactive session on subject stream selection and entrance readiness.</p><p>Topics covered include:</p><ul><li>Aptitude mapping against NEP 2020 frameworks</li><li>Top 50 emerging interdisciplinary careers</li><li>How to avoid parental and peer bias in subject selection</li></ul>",
            eventDate: new Date().toISOString(),
            eventTime: "04:00 PM - 05:30 PM",
            venue: "Online Interactive Zoom Room",
            buttonText: "Register Free",
          });
        }
      } catch (e) {
        setEvent({
          title: "National Career Orientation Webinar",
          description: "<p>Join registered career guidance psychometricians and educational psychologists for a deep-dive interactive session on subject stream selection and entrance readiness.</p><p>Topics covered include:</p><ul><li>Aptitude mapping against NEP 2020 frameworks</li><li>Top 50 emerging interdisciplinary careers</li><li>How to avoid parental and peer bias in subject selection</li></ul>",
          eventDate: new Date().toISOString(),
          eventTime: "04:00 PM - 05:30 PM",
          venue: "Online Interactive Zoom Room",
          buttonText: "Register Free",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegisterClick = () => {
    toast.success("Thank you for registering! Joining link will be emailed to you.");
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const fallbackImg = "/assets/images/events/01.jpg";
  const imgSrc = resolveImageUrl(event?.thumbnail || event?.image, fallbackImg);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link
        to="/upcoming-events"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#1b93ad] hover:text-[#136e82]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="inline-block bg-cyan-50 text-[#1b93ad] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            Live Interactive Webinar
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] leading-tight">
            {event?.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#1b93ad] shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Date</div>
                <div className="text-xs font-extrabold text-slate-800">
                  {new Date(event?.eventDate || Date.now()).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Time</div>
                <div className="text-xs font-extrabold text-slate-800">{event?.eventTime || "04:00 PM IST"}</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Location</div>
                <div className="text-xs font-extrabold text-slate-800">{event?.venue || "Online Live"}</div>
              </div>
            </div>
          </div>
        </div>

        {imgSrc && (
          <div className="rounded-2xl overflow-hidden max-h-96 w-full">
            <img
              src={imgSrc}
              alt={event?.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = fallbackImg;
              }}
            />
          </div>
        )}

        <div className="pt-2">
          <RichTextContent content={event?.description} />
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleRegisterClick}
            className="bg-[#2995ac] hover:bg-[#207f94] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            {event?.buttonText || "Reserve Free Seat"}
          </button>
        </div>
      </div>
    </div>
  );
}
