import React from 'react';
import { Link } from 'react-router';
import SearchForm from './SearchForm';
import './MenuSidebar.scss';
import { svgiData, SvgiSidebarHeader, SvgiSidebarSubIcon, SvgiCalendar, SvgiBadge, SvgiHandTouch } from '../SVGIcons';

export default class MenuSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScheduleMenuOpened: false,
      isMerticMenuOpened: false,
      isDataMenuOpened: false,
      isUploadMenuOpened: false,
      isReviewerMenuOpened: false,
      location: ''
    };
  }

  onSidebarToggle() {
    const element = document.getElementsByTagName('body')[0];
    element.classList.toggle('sidebar-hidden');
  }

  handleScheduleMenuOpen = () => {
    this.setState({ isScheduleMenuOpened: !this.state.isScheduleMenuOpened });
  }

  handleMetricMenuOpen = () => {
    this.setState({ isMerticMenuOpened: !this.state.isMerticMenuOpened });
  }

  handleDataMenuOpen = () => {
    this.setState({ isDataMenuOpened: !this.state.isDataMenuOpened });
  }

  handleUploadMenuOpen = () => {
    this.setState({ isUploadMenuOpened: !this.state.isUploadMenuOpened });
  }

  handleReviewerMenuOpen = () => {
    this.setState({ isReviewerMenuOpened: !this.state.isReviewerMenuOpened });
  }

  render() {
    const pathArr = this.props.location.pathname.split('/').filter(Boolean);
    return (
      <div className="sidebar">
        <nav className="sidebar-menu">
          <ul>
            { localStorage.getItem('role') !== 'Author' && localStorage.getItem('role') !== 'Approver' && <li className={this.state.isScheduleMenuOpened === true ? '' : 'active'}>
              <p
                className="sidebar-link sidebar-link--main"
              >
                {<SvgiSidebarHeader />}
                <span className="sidebar-item-text">FDA Quality Metrics Solution</span>
              </p>
              <ul className="sidebar-cat">
                {(localStorage.getItem('role') === 'GBM' || localStorage.getItem('role') === 'GPC' || localStorage.getItem('role') === 'SPC' || localStorage.getItem('role') === 'SPR') && <li className={this.state.isScheduleMenuOpened === true ? 'active' : ''}>
                  <p href="" className="sidebar-link">
                    { <SvgiCalendar /> }
                    <span className="sidebar-item-text">Schedule</span>
                  </p>
                  <div className="sidebar-menu-toggle" onClick={this.handleScheduleMenuOpen} />
                  <ul className="sidebar-subcat">
                    <li >
                      {(localStorage.getItem('role') === 'GPC' || localStorage.getItem('role') === 'SPC' || localStorage.getItem('role') === 'SPR') &&
                        <a
                          href="/#/Schedule"
                          className={pathArr[0] === 'Schedule' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                          { <SvgiSidebarSubIcon /> }
                          <span className="sidebar-item-text">
                            {localStorage.getItem('role') === 'GPC' && 'Plan Schedule'}
                            {localStorage.getItem('role') === 'SPC' && 'Define Scope'}
                            {(localStorage.getItem('role') === 'SPR') && 'Review Schedule'}
                          </span>
                        </a>
                      }
                    </li>
                    <li >
                      {(localStorage.getItem('role') === 'GBM' || localStorage.getItem('role') === 'GPC' || localStorage.getItem('role') === 'SPC') &&
                        <a
                          href="/#/ScheduleReopen"
                          className={pathArr[0] === 'ScheduleReopen' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                          { <SvgiSidebarSubIcon /> }
                          <span className="sidebar-item-text">
                            {'Reopen Schedule'}
                          </span>
                        </a>
                      }
                    </li>
                  </ul>

                </li> }
                { (localStorage.getItem('role') !== 'GPC' && localStorage.getItem('role') !== 'SPC' && localStorage.getItem('role') !== 'Author' && localStorage.getItem('role') !== 'Approver') && <li className={this.state.isMerticMenuOpened === true ? 'active' : ''}>
                  <p href="" className="sidebar-link">
                    { <SvgiBadge /> }
                    <span className="sidebar-item-text">Metrics Review</span>
                  </p>
                  <div className="sidebar-menu-toggle" onClick={this.handleMetricMenuOpen} />
                  <ul className="sidebar-subcat">
                    { (localStorage.getItem('role') === 'SPR' || localStorage.getItem('role') === 'MPA'
                      || localStorage.getItem('role') === 'SM') && <li>
                        <a
                          href="/#/MetricReport/home"
                          className={pathArr[0] === 'MetricReport' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                          { <SvgiSidebarSubIcon /> }
                          <span className="sidebar-item-text">
                            Metric Report Planning
                          </span>
                        </a>
                      </li>}
                    <li>
                      <a
                        href="/#/MetricMaintenance/home"
                        className={pathArr[0] === 'MetricMaintenance' ? 'sidebar-link active' : 'sidebar-link'}
                      >
                        { <SvgiSidebarSubIcon /> }
                        <span className="sidebar-item-text">
                          Metric Report Maintenance
                        </span>
                      </a>
                    </li>
                    { (localStorage.getItem('role') === 'GBR' || localStorage.getItem('role') === 'GBM'
                      || localStorage.getItem('role') === 'SM') &&
                      <li>
                        <a
                          href="/#/MetricReportReview/Home"
                          className={pathArr[0] === 'MetricReportReview' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                          { <SvgiSidebarSubIcon /> }
                          <span className="sidebar-item-text">
                            Metric Report Review
                          </span>
                        </a>
                      </li>}
                    { (localStorage.getItem('role') === 'GBM' || localStorage.getItem('role') === 'SM') && <li>
                      <a
                        href="/#/MetricFDASubmission"
                        className={pathArr[0] === 'MetricFDASubmission' ? 'sidebar-link active' : 'sidebar-link'}
                      >
                        { <SvgiSidebarSubIcon /> }
                        <span className="sidebar-item-text">
                          FDA Submission
                        </span>
                      </a>
                    </li> }
                    { (localStorage.getItem('role') === 'GBM' || localStorage.getItem('role') === 'MPA') && <li>
                      <a
                        href="/#/MetricReportReopen"
                        className={pathArr[0] === 'MetricReportReopen' ? 'sidebar-link active' : 'sidebar-link'}
                      >
                        { <SvgiSidebarSubIcon /> }
                        <span className="sidebar-item-text">
                          Reopen Metric Report
                        </span>
                      </a>
                    </li> }
                  </ul>
                </li> }
                { (localStorage.getItem('role') === 'GBM' || localStorage.getItem('role') === 'SM') && <li className={this.state.isReviewerMenuOpened === true ? 'active' : ''}>
                  <p href="" className="sidebar-link">
                    { <SvgiBadge /> }
                    <span className="sidebar-item-text">Add / Remove Reviewer</span>
                  </p>
                  <div className="sidebar-menu-toggle" onClick={this.handleReviewerMenuOpen} />
                  <ul className="sidebar-subcat">
                    <li >
                      <a
                        href="/#/Reviewer/Home"
                        className={pathArr[0] === 'Reviewer' ? 'sidebar-link active' : 'sidebar-link'}
                      >
                        { <SvgiSidebarSubIcon /> }
                        <span className="sidebar-item-text">
                          Add / Remove Reviewers
                        </span>
                      </a>
                    </li>
                  </ul>
                </li> }
              </ul>
            </li> }

            { (localStorage.getItem('role') === 'Author' || localStorage.getItem('role') === 'Approver') && <li>
              <p
                href=""
                className="sidebar-link sidebar-link--main"
              >
                {<SvgiSidebarHeader />}
                <span className="sidebar-item-text">Upload</span>
              </p>
              <ul className="sidebar-cat">
                <li className={this.state.isUploadMenuOpened === true ? 'active' : ''}>
                  <a href="/#/UploadMetric" className="sidebar-link">
                    { <SvgiCalendar />}
                    <span className="sidebar-item-text">Upload FDA Metrics</span>
                  </a>
                  <div className="sidebar-menu-toggle" onClick={this.handleUploadMenuOpen} />
                  <ul className="sidebar-subcat">
                    <li className={this.state.isUploadMenuOpened === true ? '' : 'active'}>
                      <a
                        href="/#/UploadMetric"
                        className={pathArr[0] === 'UploadMetric' ? 'sidebar-link active' : 'sidebar-link'}
                      >
                        { <SvgiSidebarSubIcon /> }
                        <span className="sidebar-item-text">
                          { localStorage.getItem('role') === 'Author' && 'Upload Plan' }
                          { localStorage.getItem('role') === 'Approver' && 'Upload Review' }
                        </span>
                      </a>
                    </li>
                    <li >
                      <a
                        href="/#/UploadMetricReopen"
                        className={pathArr[0] === 'UploadMetricReopen' ? 'sidebar-link active' : 'sidebar-link'}
                      >
                        { <SvgiSidebarSubIcon /> }
                        <span className="sidebar-item-text">
                          {'Reopen Upload'}
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>}
            <li>
              <p
                href=""
                className="sidebar-link sidebar-link--main"
              >
                { <SvgiHandTouch /> }
                <span className="sidebar-item-text">User Access Mgt.</span>
              </p>
              <ul className="sidebar-cat">
                <li className="">
                  <a href="/#/UserRequest/home" className="sidebar-link">
                    { <SvgiBadge /> }
                    <span className="sidebar-item-text">User Access Request Maintenance</span>
                  </a>
                </li>
              </ul>
            </li>
            <div className="sidebar-toggler js-sidebar-toggle" onClick={this.onSidebarToggle}>
              <svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" >
                <path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z" fill="#175d9d" />
              </svg>
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}
