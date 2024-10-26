// const { RuleTester } = require('eslint');
// const rule = require('./no-modal-after-fragment');
// const ruleTester = new RuleTester({
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   env: {
//     es6: true,
//   },
// });
// ruleTester.run('no-modal-after-fragment', rule, {
//   valid: [
//     `
//   const SomeModal = () => {
//     return (
//       <Modal>
//         <ModalBody>
//           <div>hoge</div>
//         </ModalBody>
//         <SubModal />
//       </Modal>
//     );
//   }
//   `,
//   ],
//   invalid: [
//     {
//       code: `
//   const SomeModal = () => {
//     return (
//       <>
//         <Modal>
//           <ModalBody>
//             <div>hoge</div>
//           </ModalBody>
//         </Modal>
//         <SubModal />
//       </>
//     );
//   }
//   `,
//       errors: [{ message: 'Modalをfragmentに直接入れないでください。' }],
//     },
//   ],
// });