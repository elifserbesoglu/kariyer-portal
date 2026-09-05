using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class CalendarEvent : BaseEntity<string>
    {
        public string TakvimEtkinligiID { get => Id; set => Id = value; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartTime { get; set; } = DateTime.UtcNow.AddDays(1);
        public DateTime EndTime { get; set; } = DateTime.UtcNow.AddDays(1).AddHours(1);
        public string Location { get; set; } = "Online - Microsoft Teams";
        public string EventType { get; set; } = "INTERVIEW"; // INTERVIEW, MENTORSHIP, CAREER_FAIR, WEBINAR
        public string OrganizerEmail { get; set; } = "kariyer@ktun.edu.tr";
        public string AttendeeEmail { get; set; } = "emre.tunc@ogr.ktun.edu.tr";
        public string ExternalMeetingUrl { get; set; } = "https://teams.microsoft.com/l/meetup-join/ktun-event";
        public bool ReminderSent { get; set; } = false;
        public int ReminderMinutesBefore { get; set; } = 30;

        public CalendarEvent()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}
