function Comments({children, action}) {
    return (
      <div className="comment-section">
        <div className="com-first-child">
            <div className="img-con">
                <img src="/images/logo.jpg" alt="profile_pics"/>
            </div>
            <div className="commenter-id">
                <h3>Manuel Villa</h3>
                <h4>Renter</h4>
                <div className="--com-holder">
                    <span>Moved with</span>
                    <div className="logo-holder"><img src="/images/logo.jpg" alt="logo"/></div>
                </div>
            </div>
        </div>
        <div className="com-second-child">
            <p className="quote">
                I love how smooth the move was and finally got the house we wanted
            </p>
        </div>
        <div className="com-third-child">
            <div className="com-price-box">
                <h2>$1200</h2>
                <p>Saved up to</p>
            </div>
            <div className="com-price-box">
                <h2>-24hrs</h2>
                <p>Process time</p>
            </div>
        </div>
      </div>
    );
  }
  
  export default Comments;



// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'motion/react';

// const variants = {
//   initial: { rotateY: 90 },
//   enter: { rotateY: 0, transition: { duration: 0.5 } },
//   exit: { rotateY: -90, transition: { duration: 0.5 } },
// };

// function Comments({ comments }) {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % comments.length);
//     }, 3000); // Change comment every 3 seconds

//     return () => clearInterval(intervalId);
//   }, [comments.length]);

//   return (
//     <AnimatePresence initial={false}>
//       <motion.div
//         key={index}
//         variants={variants}
//         initial="initial"
//         animate="enter"
//         exit="exit"
//         className="comment-section"
//       >
//         <div className="com-first-child">
//           <div className="img-con">
//             <img src={comments[index].image} alt="profile_pics" />
//           </div>
//           <div className="commenter-id">
//             <h3>{comments[index].name}</h3>
//             <h4>{comments[index].title}</h4>
//             <div className="--com-holder">
//               <span>Moved with</span>
//               <div className="logo-holder">
//                 <img src={comments[index].logo} alt="logo" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="com-second-child">
//           <p className="quote">{comments[index].comment}</p>
//         </div>
//         <div className="com-third-child">
//           <div className="com-price-box">
//             <h2>{comments[index].price}</h2>
//             <p>Saved up to</p>
//           </div>
//           <div className="com-price-box">
//             <h2>{comments[index].time}</h2>
//             <p>Process time</p>
//           </div>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// export default Comments;