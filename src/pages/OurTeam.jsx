import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  GraduationCap,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ShieldCheck,
  Search,
  ArrowRight,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import publicApi from "../api/publicApi";
import { extractListData, resolveImageUrl } from "../utils/dataHelper";
import SectionHeading from "../components/common/SectionHeading";

export default function OurTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
                bio: "Ph.D. in Applied Psychology with 14+ years in student aptitude modeling, vocational assessments, and cognitive profiling.",
                avatar: "/assets/images/instructor/01.jpg",
                email: "dr.ananya@kyp5.com",
                linkedin: "https://linkedin.com",
              },
              {
                id: "sample-2",
                name: "Prof. Rajesh Mehta",
                role: "Academic Guidance Director",
                bio: "Former CBSE curriculum consultant specializing in stream selection, entrance examinations, and higher education roadmaps.",
                avatar: "/assets/images/instructor/02.jpg",
                email: "prof.mehta@kyp5.com",
                linkedin: "https://linkedin.com",
              },
              {
                id: "sample-3",
                name: "Meenakshi Sundaram",
                role: "Senior Student Counselor",
                bio: "Over 8,000+ individual counseling hours guiding Class 10 & 12 students and parents towards competitive Indian and global degrees.",
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
              bio: "Ph.D. in Applied Psychology with 14+ years in student aptitude modeling, vocational assessments, and cognitive profiling.",
              avatar: "/assets/images/instructor/01.jpg",
              email: "dr.ananya@kyp5.com",
              linkedin: "https://linkedin.com",
            },
            {
              id: "sample-2",
              name: "Prof. Rajesh Mehta",
              role: "Academic Guidance Director",
              bio: "Former CBSE curriculum consultant specializing in stream selection, entrance examinations, and higher education roadmaps.",
              avatar: "/assets/images/instructor/02.jpg",
              email: "prof.mehta@kyp5.com",
              linkedin: "https://linkedin.com",
            },
            {
              id: "sample-3",
              name: "Meenakshi Sundaram",
              role: "Senior Student Counselor",
              bio: "Over 8,000+ individual counseling hours guiding Class 10 & 12 students and parents towards competitive Indian and global degrees.",
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

  const filteredTeam = team.filter((member) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const nameMatch = member.name?.toLowerCase().includes(query);
    const roleMatch = (member.role || member.designation)?.toLowerCase().includes(query);
    const bioMatch = member.bio?.toLowerCase().includes(query);
    return nameMatch || roleMatch || bioMatch;
  });

  return (
    <div className="py-10 space-y-16">
      {/* Hero Header */}
      <section className="container-page">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Advisory Board & Counselors</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Meet the Minds Behind KYP<span className="text-indigo-400">5</span> Psychometric Clarity
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Our interdisciplinary team of educational psychologists, certified counselors, data scientists, and pedagogy leaders are dedicated to bringing scientific rigor to every career choice.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link to="/tests" className="btn-primary text-xs sm:text-sm">
              <span>Take Assessment Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact-us"
              className="btn-outline bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs sm:text-sm"
            >
              <span>Connect with a Counselor</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Stats Strip */}
      <section className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="card p-6 text-center space-y-2 bg-indigo-50/50 border-indigo-100/80">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
            <div className="text-xs font-bold text-slate-600">Certified Psychometricians</div>
          </div>

          <div className="card p-6 text-center space-y-2 bg-amber-50/50 border-amber-100/80">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">15+ Yrs</div>
            <div className="text-xs font-bold text-slate-600">Psychological Research</div>
          </div>

          <div className="card p-6 text-center space-y-2 bg-emerald-50/50 border-emerald-100/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">50K+</div>
            <div className="text-xs font-bold text-slate-600">Students Evaluated</div>
          </div>

          <div className="card p-6 text-center space-y-2 bg-purple-50/50 border-purple-100/80">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">350+</div>
            <div className="text-xs font-bold text-slate-600">School Partnerships</div>
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="container-page space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Our Experts & Mentors</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Certified educational consultants and student counselors
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 pr-4 py-2 text-xs w-full rounded-xl bg-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-0 overflow-hidden animate-pulse border border-slate-200">
                <div className="h-72 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTeam.length === 0 ? (
          <div className="text-center py-16 card bg-slate-50 space-y-3">
            <Users className="w-10 h-10 text-slate-400 mx-auto" />
            <div className="text-base font-bold text-slate-700">No team members matched your search</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or view all team members.
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="btn-outline text-xs mt-2"
              >
                Clear Search Filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeam.map((member, idx) => {
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
                  className="card flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/90 hover:border-indigo-200 hover:shadow-xl bg-white"
                >
                  <div>
                    <div className="relative h-72 sm:h-80 bg-slate-100 overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = fallbackImg;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <div className="flex items-center gap-2.5">
                          {emailHref && (
                            <a
                              href={emailHref}
                              className="w-9 h-9 rounded-xl bg-white/95 text-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
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
                              className="w-9 h-9 rounded-xl bg-white/95 text-slate-800 hover:bg-[#0a66c2] hover:text-white flex items-center justify-center transition-colors shadow-sm"
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
                              className="w-9 h-9 rounded-xl bg-white/95 text-slate-800 hover:bg-[#1da1f2] hover:text-white flex items-center justify-center transition-colors shadow-sm"
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
                              className="w-9 h-9 rounded-xl bg-white/95 text-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
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
                              className="w-9 h-9 rounded-xl bg-white/95 text-slate-800 hover:bg-[#1877f2] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                              title="Facebook Profile"
                            >
                              <Facebook className="w-4 h-4 fill-current" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {member.role || member.designation || "Senior Counselor"}
                      </div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {member.name}
                      </h3>
                      {member.bio && (
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span className="font-semibold text-[11px] text-slate-400">KYP5 Advisory Board</span>
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
      </section>

      {/* Counseling Callout CTA */}
      <section className="container-page">
        <div className="card p-8 sm:p-12 bg-indigo-600 text-white rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Need Personalized 1-on-1 Guidance?
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
              Book a counseling consultation with our certified psychometricians to interpret your report and finalize your college and stream roadmap.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact-us"
              className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-extrabold text-xs sm:text-sm hover:bg-indigo-50 shadow-md transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Counseling Cell</span>
            </Link>
            <Link
              to="/tests"
              className="px-6 py-3 rounded-xl bg-indigo-700/80 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm border border-indigo-400/40 transition-all"
            >
              Take Assessment First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
