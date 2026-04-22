'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, RotateCcw,
  Phone, Calendar, Scale, Shield, Star, Briefcase, GraduationCap,
  Gavel, Users, Heart, HelpCircle, Home, Plane, Globe,
  XCircle, Building2, FileText, Clock, Sunrise, Lock, Target, MinusCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Locale = 'en' | 'ar' | 'fr';
type Goal = 'greencard' | 'citizenship' | 'work' | 'asylum' | 'deportation' | 'student' | 'other' | null;
type ResultType =
  | 'familyGreenCard' | 'marriageGreenCard' | 'citizenship'
  | 'workVisa' | 'asylum' | 'deportationDefense' | 'studentVisa' | 'general';

interface QuizState {
  step: number;
  goal: Goal;
  answers: Record<string, string>;
  result: ResultType | null;
}

const TOTAL_STEPS = 5;

const resultIcons: Record<ResultType, React.ReactNode> = {
  familyGreenCard: <Users className="w-8 h-8" />,
  marriageGreenCard: <Heart className="w-8 h-8" />,
  citizenship: <Star className="w-8 h-8" />,
  workVisa: <Briefcase className="w-8 h-8" />,
  asylum: <Shield className="w-8 h-8" />,
  deportationDefense: <Gavel className="w-8 h-8" />,
  studentVisa: <GraduationCap className="w-8 h-8" />,
  general: <Scale className="w-8 h-8" />,
};

function determineResult(answers: Record<string, string>): ResultType {
  const goal = answers['q1'];
  const q2 = answers['q2'];
  const q3 = answers['q3'];
  const q4 = answers['q4'];

  if (goal === 'd' || goal === 'asylum') return 'asylum';
  if (goal === 'e' || goal === 'deportation') return 'deportationDefense';
  if (goal === 'f' || goal === 'student') return 'studentVisa';
  if (goal === 'b' || goal === 'citizenship') return 'citizenship';
  if (goal === 'c' || goal === 'work') return 'workVisa';

  if (goal === 'a' || goal === 'greencard') {
    if (q2 === 'a') return 'marriageGreenCard';
    if (q2 === 'b' || q2 === 'c') return 'familyGreenCard';
    if (q2 === 'd') return 'workVisa';
  }

  return 'general';
}

interface OptionButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

function OptionButton({ label, value, selected, onClick, icon }: OptionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        'w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4',
        selected
          ? 'border-navy-900 bg-navy-900 text-white shadow-lg'
          : 'border-gray-200 bg-white text-gray-700 hover:border-navy-300 hover:bg-navy-50'
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <div className={cn(
        'w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all',
        selected ? 'border-gold-400 bg-gold-400' : 'border-gray-300'
      )}>
        {selected && <div className="w-2 h-2 rounded-full bg-navy-900" />}
      </div>
      <span className={cn('text-sm font-medium', selected ? 'text-white' : '')}>{label}</span>
    </motion.button>
  );
}

export default function VisaQuiz() {
  const t = useTranslations('quiz');
  const locale = useLocale() as Locale;
  const isRtl = locale === 'ar';
  const localePath = (path: string) => `/${locale}${path}`;

  const [state, setState] = useState<QuizState>({
    step: 0,
    goal: null,
    answers: {},
    result: null,
  });
  const [started, setStarted] = useState(false);

  const handleAnswer = (questionKey: string, value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionKey]: value },
    }));
  };

  const goNext = () => {
    if (state.step < TOTAL_STEPS - 1) {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
    } else {
      const result = determineResult(state.answers);
      setState((prev) => ({ ...prev, result }));
    }
  };

  const goBack = () => {
    if (state.step > 0) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
    } else {
      setStarted(false);
    }
  };

  const restart = () => {
    setState({ step: 0, goal: null, answers: {}, result: null });
    setStarted(false);
  };

  const currentStepAnswered = (): boolean => {
    const key = getStepKey(state.step);
    return !!state.answers[key];
  };

  const getStepKey = (step: number): string => {
    if (step === 0) return 'q1';
    if (step === 1) return 'q2';
    if (step === 2) return 'q3';
    if (step === 3) return 'q4';
    return 'q5';
  };

  const getQ2Key = (): string => {
    const goal = state.answers['q1'];
    if (goal === 'a') return 'q2_greencard';
    if (goal === 'b') return 'q2_citizenship';
    if (goal === 'c') return 'q2_work';
    if (goal === 'd') return 'q2_asylum';
    if (goal === 'e') return 'q2_deportation';
    return 'q2_greencard';
  };

  const q1Options = [
    { value: 'a', label: t('q1.a'), icon: <Users className="w-5 h-5" /> },
    { value: 'b', label: t('q1.b'), icon: <Star className="w-5 h-5" /> },
    { value: 'c', label: t('q1.c'), icon: <Briefcase className="w-5 h-5" /> },
    { value: 'd', label: t('q1.d'), icon: <Shield className="w-5 h-5" /> },
    { value: 'e', label: t('q1.e'), icon: <Gavel className="w-5 h-5" /> },
    { value: 'f', label: t('q1.f'), icon: <GraduationCap className="w-5 h-5" /> },
    { value: 'g', label: t('q1.g'), icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const getQ2Options = () => {
    const key = getQ2Key();
    return ['a', 'b', 'c', 'd', 'e'].map((v) => {
      try {
        const label = t(`${key}.${v}` as Parameters<typeof t>[0]);
        return { value: v, label };
      } catch {
        return null;
      }
    }).filter(Boolean) as { value: string; label: string }[];
  };

  const q3Options = [
    { value: 'a', label: t('q3.a'), icon: <Home className="w-5 h-5" /> },
    { value: 'b', label: t('q3.b'), icon: <AlertTriangle className="w-5 h-5" /> },
    { value: 'c', label: t('q3.c'), icon: <Plane className="w-5 h-5" /> },
    { value: 'd', label: t('q3.d'), icon: <Globe className="w-5 h-5" /> },
  ];

  const q4Options = [
    { value: 'a', label: t('q4.a'), icon: <XCircle className="w-5 h-5" /> },
    { value: 'b', label: t('q4.b'), icon: <AlertTriangle className="w-5 h-5" /> },
    { value: 'c', label: t('q4.c'), icon: <Scale className="w-5 h-5" /> },
    { value: 'd', label: t('q4.d'), icon: <Building2 className="w-5 h-5" /> },
    { value: 'e', label: t('q4.e'), icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const q5Options = [
    { value: 'a', label: t('q5.a'), icon: <MinusCircle className="w-5 h-5" /> },
    { value: 'b', label: t('q5.b'), icon: <FileText className="w-5 h-5" /> },
    { value: 'c', label: t('q5.c'), icon: <Clock className="w-5 h-5" /> },
    { value: 'd', label: t('q5.d'), icon: <Shield className="w-5 h-5" /> },
    { value: 'e', label: t('q5.e'), icon: <Sunrise className="w-5 h-5" /> },
    { value: 'f', label: t('q5.f'), icon: <Heart className="w-5 h-5" /> },
  ];

  const steps = [
    { key: 'q1', question: t('q1.question'), options: q1Options },
    { key: 'q2', question: t((`${getQ2Key()}.question`) as Parameters<typeof t>[0]), options: getQ2Options() },
    { key: 'q3', question: t('q3.question'), options: q3Options },
    { key: 'q4', question: t('q4.question'), options: q4Options },
    { key: 'q5', question: t('q5.question'), options: q5Options },
  ];

  const progress = started && !state.result ? ((state.step + 1) / TOTAL_STEPS) * 100 : 0;

  // Start screen
  if (!started) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="max-w-2xl w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-navy-900 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Scale className="w-10 h-10 text-gold-400" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-navy-900 mb-4">{t('title')}</h1>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">{t('subtitle')}</p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {([
                { Icon: Clock, text: '~3 minutes' },
                { Icon: Lock, text: '100% Confidential' },
                { Icon: Target, text: 'Personalized Results' },
              ] as const).map(({ Icon, text }) => (
                <div key={text} className="bg-cream-100 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-navy-900/10 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-navy-900" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{text}</p>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStarted(true)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-navy-900 text-white rounded-2xl text-lg font-bold hover:bg-navy-800 transition-colors shadow-xl hover:shadow-2xl"
            >
              {t('startButton')}
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-xs text-gray-400 mt-6">{t('disclaimer')}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Result screen
  if (state.result) {
    const resultKey = state.result;
    const titleKey = `results.${resultKey}.title` as Parameters<typeof t>[0];
    const descKey = `results.${resultKey}.desc` as Parameters<typeof t>[0];
    const actionKey = `results.${resultKey}.action` as Parameters<typeof t>[0];
    const isUrgent = resultKey === 'asylum' || resultKey === 'deportationDefense';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto px-4 py-8"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            className="w-20 h-20 rounded-3xl bg-navy-900 flex items-center justify-center mx-auto mb-4 shadow-lg text-gold-400"
          >
            {resultIcons[resultKey]}
          </motion.div>
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h2 className="font-serif text-3xl font-bold text-navy-900 mb-2">{t('resultTitle')}</h2>
          <p className="text-gray-500">{t('resultSubtitle')}</p>
        </div>

        {/* Result card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={cn(
            'rounded-3xl p-8 mb-6 border-2',
            isUrgent
              ? 'bg-red-50 border-red-200'
              : 'bg-cream-100 border-gold-200'
          )}
        >
          {isUrgent && (
            <div className="flex items-center gap-2 text-red-600 font-semibold text-sm mb-4 bg-red-100 px-4 py-2 rounded-xl">
              <AlertTriangle className="w-4 h-4" />
              {t('urgentNotice')}
            </div>
          )}
          <h3 className={cn(
            'font-serif text-2xl font-bold mb-3',
            isUrgent ? 'text-red-700' : 'text-navy-900'
          )}>
            {t(titleKey)}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-5">{t(descKey)}</p>
          <p className="text-sm font-semibold text-navy-900">{t(actionKey)}</p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Link
            href={localePath('/consultation')}
            className="flex items-center justify-center gap-2 w-full py-4 bg-navy-900 text-white rounded-2xl font-bold text-base hover:bg-navy-800 transition-colors shadow-lg"
          >
            <Calendar className="w-5 h-5" />
            {t('bookConsultation')}
          </Link>
          <a
            href="tel:4846408347"
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-navy-900 text-navy-900 rounded-2xl font-semibold text-base hover:bg-navy-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call (484) 640-8347
          </a>
          <button
            onClick={restart}
            className="flex items-center justify-center gap-2 w-full py-3 text-gray-500 rounded-2xl font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t('restartButton')}
          </button>
        </motion.div>

        <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed">{t('disclaimer')}</p>
      </motion.div>
    );
  }

  // Quiz steps
  const currentStep = steps[state.step];
  const currentKey = getStepKey(state.step);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-medium">
            {t('progressLabel', { current: state.step + 1, total: TOTAL_STEPS })}
          </span>
          <span className="font-semibold text-navy-900">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-navy-900 to-gold-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        {/* Step indicators */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                i < state.step ? 'bg-navy-900' :
                i === state.step ? 'bg-gold-500 scale-125' :
                'bg-gray-300'
              )}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.step}
          initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6 leading-snug">
            {currentStep.question}
          </h2>

          <div className="space-y-3">
            {currentStep.options.map((option) => (
              <OptionButton
                key={option.value}
                label={option.label}
                value={option.value}
                selected={state.answers[currentKey] === option.value}
                onClick={() => handleAnswer(currentKey, option.value)}
                icon={'icon' in option ? option.icon as React.ReactNode : undefined}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className={cn('flex gap-3 mt-8', isRtl ? 'flex-row-reverse' : '')}>
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {t('backButton')}
        </button>
        <button
          onClick={goNext}
          disabled={!currentStepAnswered()}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200',
            currentStepAnswered()
              ? 'bg-navy-900 text-white hover:bg-navy-800 shadow-md hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
        >
          {state.step === TOTAL_STEPS - 1 ? t('submitButton') : t('nextButton')}
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
