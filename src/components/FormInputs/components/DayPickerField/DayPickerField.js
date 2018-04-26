import React from 'react';
import _isEqual from 'lodash/isEqual';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

class DayPickerField extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let isRender = true;
    if (_isEqual(nextProps, this.props)) {
      isRender = false;
    }
    return isRender;
  }

  modifyDate = (date) => {
    this.props.onModifyDate(date);
  }

  render() {
    const { dateValue, onDisabled, onShowPastDate, onShowFutureDate } = this.props;
    const formattedDate = dateValue ? moment(dateValue).format('DD-MMM-YYYY') : '';

    const DayPickerPastDateProps = {
      todayButton: 'Go to Today',
      disabledDays: { after: new Date() },
      enableOutsideDays: true
    };

    const DayPickerFutureDateProps = {
      todayButton: 'Go to Today',
      disabledDays: { before: new Date() },
      enableOutsideDays: true
    };

    return (
      <div>
        {onShowPastDate && <DayPickerInput
          placeholder="DD-MMM-YYYY"
          onDayChange={this.modifyDate}
          value={formattedDate}
          format="DD-MMM-YYYY"
          disabled={onDisabled}
          dayPickerProps={DayPickerPastDateProps}
          {...this.props}
        />}

        {onShowFutureDate && <DayPickerInput
          placeholder="DD-MMM-YYYY"
          onDayChange={this.modifyDate}
          value={formattedDate}
          format="DD-MMM-YYYY"
          disabled={onDisabled}
          dayPickerProps={DayPickerFutureDateProps}
          {...this.props}
        />}

        {!onShowPastDate && !onShowFutureDate && <DayPickerInput
          placeholder="DD-MMM-YYYY"
          onDayChange={this.modifyDate}
          disabled={onDisabled}
          value={formattedDate}
          format="DD-MMM-YYYY"
          {...this.props}
        />}
      </div>
    );
  }
}

export default DayPickerField;
