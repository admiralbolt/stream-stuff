import pickle
import wave


sound_file = wave.open("warmup.wav", "rb")
frames = bytearray()
current_data = sound_file.readframes(1024)
while current_data:
  frames.extend(current_data)
  current_data = sound_file.readframes(1024)
iter_read = bytes(frames)
sound_file.close()

sound_file = wave.open("warmup.wav", "rb")
full_read = sound_file.readframes(sound_file.getnframes())

print(full_read == iter_read)


# with open("debug.pickle", "rb") as rh:
#   data = pickle.load(rh)
#
#
# for i, key in enumerate(data["raw"].keys()):
#   print(f"({i}): {data['raw'][i] == data['cached'][i]}, rawlen: {len(data['raw'][i])}, cachedlen: {len(data['cached'][i])}")
#
#
#
# index = 1
# for i, (raw_byte, cached_byte) in enumerate(zip(data["raw"][index], data["cached"][index])):
#   print(f"({i}): {raw_byte}, {cached_byte}")
#   if i == 3000:
#     break
