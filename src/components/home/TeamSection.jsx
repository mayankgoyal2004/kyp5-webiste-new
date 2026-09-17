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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Expert Advisory Board"
          title="Meet Our Research Psychologists & Counselors"
          subtitle="Our assessment questions, scoring rubrics, and career trees are meticulously crafted by accredited educational and psychological experts."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => {
            const fallbackImg = `/assets/images/instructor/0${(idx % 3) + 1}.jpg`;
            const imgSrc = resolveImageUrl(member.avatar || member.image, fallbackImg);

            return (
              <div
                key={member.id || idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 bg-slate-100 overflow-hidden">
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
                    <h3 className="text-base font-extrabold text-[#0f172a] group-hover:text-[#1b93ad] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-bold text-[#1b93ad]">
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
