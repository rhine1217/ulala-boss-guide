import React from 'react';
import { Input } from 'antd'

const SetupPageNotes = ({setupNotes, onNoteInput}) => (
  <div style={{padding: '0 24px 16px', textAlign: 'right'}}>
    <Input.TextArea 
      placeholder="Add any other notes here" 
      defaultValue={'' || setupNotes}
      rows={2} 
      autoSize={false} 
      maxLength={140} 
      onChange={onNoteInput}/>
    <div style={{fontSize: '12px', marginTop: '6px'}}>{setupNotes.length} / 140</div> 
  </div>
)

export default SetupPageNotes