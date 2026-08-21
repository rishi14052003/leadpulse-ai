'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PipelineCard as PipelineCardType, PipelineStage } from '../../lib/types';
import { PIPELINE_STAGES } from '../../data/mock-pipeline';
import { formatCurrency, getScoreBadgeStyle } from '../../lib/score-utils';
import { ScoreBadge } from '../../components/shared/ScoreBadge';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Kanban, Clock, DollarSign, GripVertical } from 'lucide-react';

// Draggable Card Item Component
function DraggableCard({ card }: { card: PipelineCardType }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const isWon = card.stage === 'Won';
  const isLost = card.stage === 'Lost';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl border p-3.5 shadow-xs hover:shadow-md transition-all group ${
        isDragging ? 'ring-2 ring-blue-500 shadow-xl' : ''
      } ${
        isWon ? 'border-emerald-300 bg-emerald-50/30' : isLost ? 'border-slate-300 bg-slate-100/60 opacity-75' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          {/* Drag Handle */}
          <span
            {...attributes}
            {...listeners}
            className="p-1 rounded text-slate-300 hover:text-slate-600 cursor-grab active:cursor-grabbing"
            title="Drag Card"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </span>
          <span className="text-base" role="img" aria-label={card.country}>{card.flag}</span>
          <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {card.company}
          </h4>
        </div>
        <ScoreBadge score={card.score} size="sm" showTierLabel={false} />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
          {card.serviceTag}
        </span>
        <span className="text-xs font-mono font-bold text-slate-900">
          {formatCurrency(card.value)}
        </span>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-1 text-slate-400">
          <Clock className="w-3 h-3" />
          <span>{card.daysInStage}d in stage</span>
        </div>
        <div 
          className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-[10px]"
          title={`Owner: ${card.ownerName}`}
        >
          {card.ownerInitials}
        </div>
      </div>
    </div>
  );
}

// Kanban Column Component
function KanbanColumn({ stage, cards }: { stage: PipelineStage; cards: PipelineCardType[] }) {
  const totalValue = cards.reduce((sum, c) => sum + c.value, 0);

  const columnStyles = 
    stage === 'Won' ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' :
    stage === 'Lost' ? 'bg-slate-100/70 border-slate-300 text-slate-700' :
    'bg-slate-50/70 border-slate-200 text-slate-900';

  return (
    <div className={`w-72 shrink-0 rounded-2xl border ${columnStyles} p-3 flex flex-col h-[calc(100vh-220px)] shadow-2xs`}>
      {/* Column Header */}
      <div className="pb-3 mb-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs tracking-tight uppercase font-mono">{stage}</h3>
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-mono font-bold flex items-center justify-center">
              {cards.length}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 block mt-0.5 font-semibold">
            {formatCurrency(totalValue)}
          </span>
        </div>
      </div>

      {/* Cards List Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <DraggableCard key={card.id} card={card} />
          ))}
        </SortableContext>
        {cards.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-mono italic">
            Drop cards here
          </div>
        )}
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const { pipelineCards, movePipelineCard } = useApp();
  const [activeCard, setActiveCard] = useState<PipelineCardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const card = pipelineCards.find((c) => c.id === event.active.id);
    if (card) setActiveCard(card);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id as string;
    const overId = over.id as string;

    // Check if dropped directly onto a column stage name
    if (PIPELINE_STAGES.includes(overId as PipelineStage)) {
      movePipelineCard(cardId, overId as PipelineStage);
      return;
    }

    // Or dropped on another card -> move to that card's stage
    const targetCard = pipelineCards.find((c) => c.id === overId);
    if (targetCard && targetCard.stage) {
      movePipelineCard(cardId, targetCard.stage);
    }
  };

  const grandTotalValue = pipelineCards.reduce((sum, c) => sum + c.value, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CRM Pipeline Kanban</h1>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 font-mono">
              9 Interactive Stages
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Drag and drop deals across pipeline stages to update progress and forecast revenue.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-right">
          <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">Total Pipeline Value</span>
          <span className="text-xl font-bold font-mono text-slate-900">{formatCurrency(grandTotalValue)}</span>
        </div>
      </div>

      {/* Horizontal Scrollable Kanban Container */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {PIPELINE_STAGES.map((stage) => {
              const stageCards = pipelineCards.filter((c) => c.stage === stage);
              return <KanbanColumn key={stage} stage={stage} cards={stageCards} />;
            })}
          </div>
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="bg-white rounded-xl border-2 border-blue-500 p-3.5 shadow-2xl rotate-3 w-72 opacity-95">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base">{activeCard.flag}</span>
                <span className="font-bold text-xs text-slate-900">{activeCard.company}</span>
              </div>
              <div className="text-xs font-mono font-bold text-blue-600">{formatCurrency(activeCard.value)}</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
