export const quickQuestions = [
  'Comment fonctionne le portage salarial ?',
  'Je suis consultant IT, est-ce adapté ?',
  'Simuler mes revenus',
  'Trouver une expertise',
  'Je suis une entreprise',
];

interface Props {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export default function QuickQuestions({ onSelect, disabled = false }: Props) {
  return (
    <div className="tp-chat-quick" aria-label="Questions fréquentes">
      {quickQuestions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
        >
          {question}
        </button>
      ))}
    </div>
  );
}

