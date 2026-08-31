import { IMPORTANT_STATEMENTS } from '@/data/info';

export function ImportantStuff() {
  return (
    <section id="important" className="w-full px-6 sm:px-10 md:px-14 py-20 md:py-28 bg-transparent border-t border-white/5 select-none">
      <div className="max-w-3xl mx-auto text-left">
        
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white/95 tracking-tight mb-10">
          Read this shidd
        </h2>

        {/* 3 Bold Direct Statements */}
        <div className="space-y-6">
          {IMPORTANT_STATEMENTS.map((statement) => (
            <div
              key={statement.id}
              className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-colors hover:border-white/20"
            >
              <p className="text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed">
                {statement.text}{' '}
                {statement.linkHref && statement.linkText && (
                  <>
                    <a
                      href={statement.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-4 font-medium transition-colors"
                    >
                      {statement.linkText}
                    </a>{' '}
                  </>
                )}
                {statement.textSuffix && statement.textSuffix}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
