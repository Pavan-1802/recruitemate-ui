import { Zap, CheckCircle, BarChart3, Briefcase } from 'lucide-react';

export default function Landing() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-slate-50 border-r border-slate-200 min-h-screen">
      <div className="flex flex-col justify-center px-12 xl:px-20 py-12 max-w-xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-900">RecruitMate</h1>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Your ultimate recruitment assistant powered by AI
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Smart Candidate Matching
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                AI-powered algorithms that match the perfect candidates to your job requirements in seconds
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Automated Screening
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Save hours by automating resume screening and initial candidate assessments
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Data-Driven Insights
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Make informed hiring decisions with comprehensive analytics and reporting
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-semibold text-slate-900 mb-1">10k+</div>
              <div className="text-sm text-slate-600">Successful Hires</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-900 mb-1">500+</div>
              <div className="text-sm text-slate-600">Companies</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-900 mb-1">95%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}