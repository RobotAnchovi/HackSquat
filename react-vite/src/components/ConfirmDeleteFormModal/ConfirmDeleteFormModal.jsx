import './ConfirmDeleteFormModal.css';

function ConfirmDeleteFormModal({ text, deleteCb, cancelDeleteCb }) {
  function Question() {
    return <p>{text}</p>;
  }

  return (
    <div id='confirm-delete'>
      <h2 className='subheading'>Confirm Delete</h2>
      <Question />
      <div id='delete-btns'>
        <button className='btn' onClick={deleteCb}>
          <span>Yes</span>
        </button>
        <button className='btn' onClick={cancelDeleteCb}>
          <span>No</span>
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteFormModal;
