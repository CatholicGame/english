interface Props {
  text: string;
  translation: string;
  saved: boolean;
  onSave: () => void;
  onDelete: () => void;
}

export function TranslationDetail({ text, translation, saved, onSave, onDelete }: Props) {
  return (
    <>
      <div className="mb-4 pr-6">
        <span className="label-xs">Câu gốc</span>
        <p className="mt-1 text-[15px] leading-relaxed">{text}</p>
      </div>

      <div className="mb-4">
        <span className="label-xs">Bản dịch</span>
        <p className="mt-1 text-[15px] leading-relaxed">{translation}</p>
      </div>

      {saved ? (
        <button type="button" className="btn btn-secondary text-[12px] text-red-600" onClick={onDelete}>
          ✓ Đã lưu · Xoá
        </button>
      ) : (
        <button type="button" className="btn btn-primary px-4 py-2 text-[13px]" onClick={onSave}>
          💾 Lưu bản dịch
        </button>
      )}
    </>
  );
}
