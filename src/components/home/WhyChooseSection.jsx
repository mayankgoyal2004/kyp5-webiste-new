import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Zap,
  Award,
  Users,
  BrainCircuit,
  HeadphonesIcon
} from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import publicApi from "../../api/publicApi";
import { extractListData } from "../../utils/dataHelper";

export default function WhyChooseSection() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchWhyChoose = async () => {
      try {
        const res = await publicApi.getWhyChooseCards();
        const list = extractListData(res);
        if (list && list.length > 0) {
          setCards(list);
        } else {
          setCards([
            {
              id: "1",
              title: "Scientific & Psychometrically Validated",
              description:
                "Standardized using verified Indian student samples across diverse regional and educational backgrounds.",
              icon: BrainCircuit,
            },
            {
              id: "2",
              title: "Instant 15+ Page Comprehensive PDF",
              description:
                "Detailed reporting generated immediately after submission, containing career lists, aptitude graphs, and action steps.",
              icon: Zap,
            },
            {
              id: "3",
              title: "Standardized Holland RIASEC Framework",
              description:
                "Maps 6 psychological archetypes to over 900+ modern university majors, emerging AI tech, and creative fields.",
              icon: Award,
            },
            {
              id: "4",
              title: "Trilingual Examination Engine",
              description:
                "Switch seamlessly between English, Punjabi, and Hindi during the live assessment without losing responses.",
              icon: Users,
            },
            {
              id: "5",
              title: "Certified Psychometrician Review",
              description:
                "All assessment batteries are built and monitored by licensed psychological researchers and career guidance practitioners.",
              icon: ShieldCheck,
            },
            {
              id: "6",
              title: "Dedicated Counselor Support Desk",
              description:
                "Post-test counseling sessions available with qualified advisors to help parents and students choose the right stream.",
              icon: HeadphonesIcon,
            },
          ]);
        }
      } catch (err) {
        console.warn("Using sample why choose data", err);
      }
    };
    fetchWhyChoose();
  }, []);

  const defaultIcons = [BrainCircuit, Zap, Award, Users, ShieldCheck, HeadphonesIcon];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose KYP5"
          title="Engineered for Accuracy, Built for Students"
          subtitle="Discover what sets our psychometric testing engine and career guidance algorithms apart from generic surveys."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const IconComp = card.icon || defaultIcons[idx % defaultIcons.length];
            return (
              <div
                key={card.id || idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#1b93ad] flex items-center justify-center group-hover:bg-[#1b93ad] group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-extrabold text-[#0f172a] group-hover:text-[#1b93ad] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
