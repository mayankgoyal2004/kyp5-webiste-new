import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Twitter, Facebook, Instagram, ArrowRight, UserCheck } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import publicApi from "../../api/publicApi";
import { extractListData, resolveImageUrl } from "../../utils/dataHelper";

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getTeam();
        const list = extractListData(res);
        if (isMounted) {
          if (list && list.length > 0) {
            setTeam(list);
          } else {
            setTeam([
              {
                id: "sample-1",
                name: "Dr. Ananya Sharma",
                role: "Lead Psychometrician & Career Psychologist",
                bio: "Ph.D. in Applied Psychology with 14+ years in student aptitude modeling and vocational assessment.",
                avatar: "/assets/images/instructor/01.jpg",
                email: "dr.ananya@kyp5.com",
                linkedin: "https://linkedin.com",
              },
              {
                id: "sample-2",
                name: "Prof. Rajesh Mehta",
                role: "Academic Guidance Director",
                bio: "Former CBSE curriculum consultant specializing in stream selection and career entrance strategy.",
                avatar: "/assets/images/instructor/02.jpg",
                email: "prof.mehta@kyp5.com",
                linkedin: "https://linkedin.com",
              },
              {
                id: "sample-3",
                name: "Meenakshi Sundaram",
                role: "Senior Student Counselor",
                bio: "Over 8,000+ individual counseling hours guiding Class 10 & 12 students towards competitive degrees.",
                avatar: "/assets/images/instructor/03.jpg",
                email: "meenakshi@kyp5.com",
                linkedin: "https://linkedin.com",
              },
            ]);
          }
        }
      } catch (err) {
        console.warn("Using sample team", err);
        if (isMounted) {
          setTeam([
            {
              id: "sample-1",
              name: "Dr. Ananya Sharma",
              role: "Lead Psychometrician & Career Psychologist",
              bio: "Ph.D. in Applied Psychology with 14+ years in student aptitude modeling and vocational assessment.",
              avatar: "/assets/images/instructor/01.jpg",
              email: "dr.ananya@kyp5.com",
              linkedin: "https://linkedin.com",
            },
            {
              id: "sample-2",
              name: "Prof. Rajesh Mehta",
              role: "Academic Guidance Director",
              bio: "Former CBSE curriculum consultant specializing in stream selection and career entrance strategy.",
              avatar: "/assets/images/instructor/02.jpg",
              email: "prof.mehta@kyp5.com",
              linkedin: "https://linkedin.com",
            },
            {
              id: "sample-3",
              name: "Meenakshi Sundaram",
              role: "Senior Student Counselor",
              bio: "Over 8,000+ individual counseling hours guiding Class 10 & 12 students towards competitive degrees.",
              avatar: "/assets/images/instructor/03.jpg",
              email: "meenakshi@kyp5.com",
              linkedin: "https://linkedin.com",
            },
          ]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatExternalUrl = (url) => {
    if (!url || typeof url !== "string") return "";
    const clean = url.trim();
    if (!clean) return "";
    return clean.startsWith("http://") || clean.startsWith("https://") ? clean : `https://${clean}`;
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            badge="Expert Advisory Board"
            title="Meet Our Psychologists & Counselors"
            subtitle="Our assessment batteries, scoring algorithms, and career paths are meticulously crafted by certified educational and psychological experts."
            className="mb-0 text-left"
          />

          <Link
            to="/our-team"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 px-4 py-2.5 rounded-xl transition-colors shrink-0 self-start md:self-auto"
          >
            <span>View All Experts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-0 overflow-hidden animate-pulse border border-slate-200">
                <div className="h-64 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No team members listed at this time.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => {
              const fallbackImg = `/assets/images/instructor/0${(idx % 3) + 1}.jpg`;
              const imgSrc = resolveImageUrl(member.avatar || member.image, fallbackImg);
              const fbUrl = formatExternalUrl(member.facebook);
              const igUrl = formatExternalUrl(member.instagram);
              const liUrl = formatExternalUrl(member.linkedin);
              const twUrl = formatExternalUrl(member.twitter);
              const emailHref = member.email ? `mailto:${member.email}` : "";

              return (
                <div
                  key={member.id || idx}
                  className="card flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/90 hover:border-indigo-200 hover:shadow-lg bg-white"
                >
                  <div>
                    <div className="relative h-64 sm:h-72 bg-slate-100 overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = fallbackImg;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex items-center gap-2">
                          {emailHref && (
                            <a
                              href={emailHref}
                              className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                          {liUrl && (
                            <a
                              href={liUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-slate-800 hover:bg-[#0a66c2] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                              title="LinkedIn Profile"
                            >
                              <Linkedin className="w-4 h-4 fill-current" />
                            </a>
                          )}
                          {twUrl && (
                            <a
                              href={twUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-slate-800 hover:bg-[#1da1f2] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                              title="Twitter / X Profile"
                            >
                              <Twitter className="w-4 h-4 fill-current" />
                            </a>
                          )}
                          {igUrl && (
                            <a
                              href={igUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                              title="Instagram Profile"
                            >
                              <Instagram className="w-4 h-4" />
                            </a>
                          )}
                          {fbUrl && (
                            <a
                              href={fbUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-slate-800 hover:bg-[#1877f2] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                              title="Facebook Profile"
                            >
                              <Facebook className="w-4 h-4 fill-current" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {member.role || member.designation || "Career Consultant"}
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {member.name}
                      </h3>
                      {member.bio && (
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer Socials visible on mobile/default */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span className="font-semibold text-[11px] text-slate-400">KYP5 Certified</span>
                    <div className="flex items-center gap-2">
                      {emailHref && (
                        <a
                          href={emailHref}
                          className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                          title="Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {liUrl && (
                        <a
                          href={liUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-[#0a66c2] transition-colors p-1"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {twUrl && (
                        <a
                          href={twUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-[#1da1f2] transition-colors p-1"
                          title="Twitter"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {igUrl && (
                        <a
                          href={igUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-pink-600 transition-colors p-1"
                          title="Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {fbUrl && (
                        <a
                          href={fbUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-[#1877f2] transition-colors p-1"
                          title="Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
