import React from "react";
import CardItem from "./CardItem";

const CardList = (props) => {
  if (props.items.length === 0) {
    return <div>No places found. Maybe create one?</div>;
  }

  return (
    <ul className="flex flex-wrap justify-center">
      {props.items.map((act) => (
        <CardItem
          key={act.id}
          id={act.id}
          image={act.image}
          activityName={act.title}
          date={act.date}
          description={act.description}
          timeStart={act.timeStart}
          timeEnd={act.timeEnd}
          sport={act.sport}
          creatorId={act.creator}
          onDelete={props.onDeleteActivity}
        />
      ))}
    </ul>
  );
};

export default CardList;
