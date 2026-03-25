import React from 'react';
import { motion } from 'framer-motion';
import { ActionCenter } from '../components/ActionCenter';
import { ClipboardList } from 'lucide-react';

export function ActionLogs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F27D26]/10 rounded-lg">
            <ClipboardList className="w-5 h-5 text-[#F27D26]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Autonomous Action Logs</h2>
        </div>
        <p className="text-[#8E9299] max-w-2xl">
          Track every autonomous decision and its financial impact. Full traceability for all approved and rejected cost optimization actions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ActionCenter />
      </div>
    </motion.div>
  );
}
