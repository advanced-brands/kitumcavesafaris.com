import cv2
import os

video = r"c:\Users\Beth\Videos\Screen Recordings\Screen Recording 2026-08-13 153807.mp4"
out_dir = r"c:\Users\Beth\Desktop\kitumcavesafaris.com\.tmp-pkg-ref4"
os.makedirs(out_dir, exist_ok=True)
cap = cv2.VideoCapture(video)
times = [
    10.0, 10.2, 10.4, 10.6, 10.8, 11.0, 11.2, 11.4, 11.6, 11.8, 12.0,
    12.2, 12.4, 12.6, 12.8, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5,
    16.0, 16.2, 16.4, 16.6, 16.8, 17.0, 17.5, 18.0, 18.5, 19.0, 19.5, 20.0,
]
for t in times:
    cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
    ok, frame = cap.read()
    if ok:
        name = f"f_{str(t).replace('.', '_')}.jpg"
        cv2.imwrite(os.path.join(out_dir, name), frame)
        print("saved", name)
cap.release()
