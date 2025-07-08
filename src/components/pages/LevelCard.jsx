import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const LevelCard = ({ isLevelComplete }) => {
  return (
    <div>
      {isLevelComplete && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center gap-2"
        >
          <div className="bg-success/20 p-2 rounded-full">
            <ApperIcon name="Trophy" size={20} className="text-success" />
          </div>
          <Badge variant="gold" icon="Crown">
            Level Complete
          </Badge>
        </motion.div>
      )}
    </div>
  );
};

export default LevelCard;