import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Mail, Linkedin } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import publicApi from "../../api/publicApi";
import { extractListData, resolveImageUrl } from "../../utils/dataHelper";

export default function TeamSection() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await publicApi.getTeam();
        const list = extractListData(res);
        if (list && list.length > 0) {
          setTeam(list);
        } else {
          setTeam([
            {
              id: "1",
              name: "Dr. Ananya Sharma",
              role: "Lead Psychometrician & Career Psychologist",
              bio: "Ph.D. in Applied Psychology with 14+ years in student aptitude modeling and vocational assessment.",
              avatar: "/assets/images/instructor/01.jpg",
            },
            {
              id: "2",
              name: "Prof. Rajesh Mehta",
              role: "Academic Guidance Director",
              bio: "Former CBSE curriculum consultant specializing in stream selection and career entrance strategy.",
              avatar: "/assets/images/instructor/02.jpg",
            },
            {
              id: "3",
              name: "Meenakshi Sundaram",
              role: "Senior Student Counselor",
              bio: "Over 8,000+ individual counseling hours guiding Class 10 & 12 students towards competitive degrees.",
              avatar: "/assets/images/instructor/03.jpg",
            },
          ]);
        }
      } catch (err) {
        console.warn("Using sample team", err);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="container-page">
        <SectionHeading
          badge="Expert Advisory Board"
          title="Meet Our Psychologists & Counselors"
          subtitle="Our assessment batteries, scoring algorithms, and career paths are meticulously crafted by certified educational and psychological experts."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => {
            const fallbackImg = `/assets/images/instructor/0${(idx % 3) + 1}.jpg`;
            const imgSrc = resolveImageUrl(member.avatar || member.image, fallbackImg);

            return (
              <div
                key={member.id || idx}
                className="card flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="relative h-60 bg-slate-100 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = fallbackImg;
                      }}
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-bold text-indigo-600">
                      {member.role || member.designation || "Career Consultant"}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                      {member.bio || "Dedicated psychologist and career guidance mentor."}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
